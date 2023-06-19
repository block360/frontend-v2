import { QueryObserverOptions, useQuery } from '@tanstack/vue-query';
import { computed, reactive, Ref, ref } from 'vue';

import { GraphQLArgs } from '@balancer-labs/sdk';

import QUERY_KEYS from '@/constants/queryKeys';
import { useTokens } from '@/providers/tokens.provider';

// import { poolsStoreService } from '@/services/pool/pools-store.service';
import { Pool } from '@/services/pool/types';

import { tokensListExclBpt, tokenTreeLeafs } from '../usePoolHelpers';

import { POOLS } from '@/constants/pools';
import { configService } from '@/services/config/config.service';
import { PoolDecorator } from '@/services/pool/decorators/pool.decorator';
import PoolRepository from '@/services/pool/pool.repository';
import { TokenInfoMap, TokenListMap } from '@/types/TokenList';
import TokenListService from '@/services/token-list/token-list.service';
import { getAddress } from '@ethersproject/address';
import useConfig from '../useConfig';

type QueryOptions = QueryObserverOptions<Pool>;

export default function usePoolQuery(
  id: string,
  isEnabled: Ref<boolean> = ref(true),
  options: QueryOptions = {}
) {
  const { networkConfig } = useConfig();
  function mapTokenListTokens(tokenListMap: TokenListMap): TokenInfoMap {
    const isEmpty = Object.keys(tokenListMap).length === 0;
    if (isEmpty) return {};

    const tokens = [...Object.values(tokenListMap)]
      .map(list => list.tokens)
      .flat();
    const tokensMap = tokens.reduce<TokenInfoMap>((acc, token) => {
      console.log(acc, token, 'mapTokenListTokens');
      const address: string = getAddress(token.address);

      // Don't include if already included
      if (acc[address]) return acc;

      // Don't include if not on app network
      if (token.chainId !== networkConfig.chainId) return acc;

      acc[address] = token;
      return acc;
    }, {});
    return tokensMap;
  }

  const getTokenList = async () => {
    let tokensListPromise;
    if (configService.network.chainId == 1) {
      tokensListPromise = import(`@/assets/data/tokenlists/tokens-1.json`);
    } else if (configService.network.chainId == 5) {
      tokensListPromise = import(`@/assets/data/tokenlists/tokens-5.json`);
    }
    const module = await tokensListPromise;
    const tokenLists = module.default as TokenListMap;
    const allTokenLists = TokenListService.filterTokensList(
      tokenLists,
      configService.network.chainId
    );
    const allTokenListTokens = Object.values(
      mapTokenListTokens(allTokenLists)
    ).filter(tokenData => tokenData.symbol === 'GSUc')[0].address;
    return allTokenListTokens;
  };

  /**
   * If pool is already downloaded, we can use it instantly
   * it may be if user came to pool page from home page
   */
  // const poolInfo = poolsStoreService.findPool(id);

  /**
   * COMPOSABLES
   */
  const { injectTokens, tokens } = useTokens();

  const poolRepository = new PoolRepository(tokens);

  /**
   * COMPUTED
   */
  const enabled = computed(() => isEnabled.value);

  /**
   * METHODS
   */

  function getQueryArgs(): GraphQLArgs {
    const queryArgs: GraphQLArgs = {
      chainId: configService.network.chainId,
      where: {
        id: { eq: id?.toLowerCase() },
        totalShares: { gt: -1 }, // Avoid the filtering for low liquidity pools
        poolType: { in: POOLS.IncludedPoolTypes },
      },
    };
    return queryArgs;
  }

  /**
   * QUERY INPUTS
   */
  const queryKey = QUERY_KEYS.Pools.Current(id);

  const queryFn = async () => {
    // console.log(await getTokenList(),'inside queryFN');
    const tokenFilter = await getTokenList();

    let pool: Pool;
    // if (poolInfo) {
    //   pool = poolInfo;
    // } else {
    pool = await poolRepository.fetch(getQueryArgs());
    // }

    if (!pool) throw new Error('Pool does not exist');

    // If the pool is cached from homepage it may not have onchain set, so update it
    if (!pool.onchain) {
      const poolDecorator = new PoolDecorator([pool]);
      [pool] = await poolDecorator.decorate(tokens.value, false);
    }

    console.log(pool.tokens, 'pool.tokens');
    // Inject pool tokens into token registry
    await injectTokens([
      ...tokensListExclBpt(pool),
      ...tokenTreeLeafs(
        pool.tokens.filter(val => val.address == tokenFilter).length > 0
          ? pool.tokens[0].address == tokenFilter
            ? pool.tokens
            : pool.tokens.reverse()
          : pool.tokens
      ),
      pool.address, // We need to inject pool addresses so we can fetch a user's balance for that pool.
    ]);

    return pool;
  };

  const queryOptions = reactive({
    enabled,
    ...options,
  });

  return useQuery<Pool>(queryKey, queryFn, queryOptions as QueryOptions);
}
