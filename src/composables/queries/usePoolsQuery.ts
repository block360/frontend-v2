import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/vue-query';

import { POOLS } from '@/constants/pools';
import QUERY_KEYS from '@/constants/queryKeys';
import { Pool } from '@/services/pool/types';

import useNetwork from '../useNetwork';
import { useTokens } from '@/providers/tokens.provider';
import { configService } from '@/services/config/config.service';
import {
  GraphQLArgs,
  PoolsRepositoryFetchOptions,
  PoolRepository as SDKPoolRepository,
} from '@balancer-labs/sdk';
import { getPoolsFallbackRepository } from '@/dependencies/PoolsFallbackRepository';
import { PoolDecorator } from '@/services/pool/decorators/pool.decorator';
import { flatten } from 'lodash';
import { tokenTreeLeafs } from '../usePoolHelpers';
import { balancerSubgraphService } from '@/services/balancer/subgraph/balancer-subgraph.service';
import { balancerAPIService } from '@/services/balancer/api/balancer-api.service';
import { poolsStoreService } from '@/services/pool/pools-store.service';
import { isBalancerApiDefined } from '@/lib/utils/balancer/api';
import { bnum } from '@/lib/utils';
import useConfig from '../useConfig';
import { TokenInfoMap, TokenListMap } from '@/types/TokenList';
import { getAddress } from '@ethersproject/address';
import TokenListService from '@/services/token-list/token-list.service';

type PoolsQueryResponse = {
  pools: Pool[];
  skip?: number;
};

type FilterOptions = {
  poolIds?: Ref<string[]>;
  poolAddresses?: Ref<string[]>;
  isExactTokensList?: boolean;
  pageSize?: number;
  first?: number;
};

export default function usePoolsQuery(
  filterTokens: Ref<string[]> = ref([]),
  options: UseInfiniteQueryOptions<PoolsQueryResponse> = {},
  filterOptions?: FilterOptions,
  poolsSortField?: Ref<string>
) {
  /**
   * COMPOSABLES
   */
  const { injectTokens, tokens: tokenMeta } = useTokens();
  const { networkId } = useNetwork();
  let poolsRepository = initializePoolsRepository();
  const { networkConfig } = useConfig();

  /**
   * METHODS
   */
  function mapTokenListTokens(tokenListMap: TokenListMap): TokenInfoMap {
    const isEmpty = Object.keys(tokenListMap).length === 0;
    if (isEmpty) return {};

    const tokens = [...Object.values(tokenListMap)]
      .map(list => list.tokens)
      .flat();

    const tokensMap = tokens.reduce<TokenInfoMap>((acc, token) => {
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

  async function getTokenList() {
    let tokensListPromise;
    if (configService.network.chainId == 1) {
      tokensListPromise = import(`@/assets/data/tokenlists/tokens-1.json`);
    } else if (configService.network.chainId == 5) {
      tokensListPromise = import(`@/assets/data/tokenlists/tokens-5.json`);
    }

    const module = await tokensListPromise;
    console.log(module.default, 'usePoolFilters');
    const tokenLists = module.default as TokenListMap;
    const allTokenLists = TokenListService.filterTokensList(
      tokenLists,
      configService.network.chainId
    );
    const allTokenListTokens = Object.values(
      mapTokenListTokens(allTokenLists)
    ).filter(tokenData => tokenData.symbol === 'GSUc')[0].address;
    return allTokenListTokens;
  }

  function initializePoolsRepository() {
    const FallbackRepository = getPoolsFallbackRepository();
    const fallbackRepository = new FallbackRepository(buildRepositories(), {
      timeout: 30 * 1000,
    });
    return fallbackRepository;
  }

  function initializeDecoratedAPIRepository() {
    return {
      fetch: async (options: PoolsRepositoryFetchOptions): Promise<Pool[]> => {
        const pools = await balancerAPIService.pools.get(getQueryArgs(options));

        const tokens = flatten(
          pools.map(pool => [
            ...pool.tokensList,
            ...tokenTreeLeafs(pool.tokens),
            pool.address,
          ])
        );
        injectTokens(tokens);

        return pools;
      },
      get skip(): number {
        return balancerAPIService.pools.skip;
      },
    };
  }

  function initializeDecoratedSubgraphRepository() {
    return {
      fetch: async (options: PoolsRepositoryFetchOptions): Promise<Pool[]> => {
        const pools = await balancerSubgraphService.pools.get(
          getQueryArgs(options)
        );

        const tokenFilter = await getTokenList();
        console.log(
          tokenFilter,
          'inside initializeDecoratedSubgraphRepository'
        );

        const poolDecorator = new PoolDecorator(pools);
        let decoratedPools = await poolDecorator.decorate(tokenMeta.value);

        const tokens = flatten(
          pools.map(pool => [
            ...(pool.tokensList.includes(tokenFilter)
              ? pool.tokensList[0] == tokenFilter
                ? pool.tokensList
                : pool.tokensList.reverse()
              : pool.tokensList),
            ...tokenTreeLeafs(
              pool.tokens.filter(val => val.address == tokenFilter).length > 0
                ? pool.tokens[0].address == tokenFilter
                  ? pool.tokens
                  : pool.tokens.reverse()
                : pool.tokens
            ),
            pool.address,
          ])
        );
        await injectTokens(tokens);

        decoratedPools = await poolDecorator.reCalculateTotalLiquidities();

        return decoratedPools;
      },
      get skip(): undefined {
        return undefined;
      },
    };
  }

  function buildRepositories() {
    const repositories: SDKPoolRepository[] = [];
    if (isBalancerApiDefined) {
      const balancerApiRepository = initializeDecoratedAPIRepository();
      repositories.push(balancerApiRepository);
    }
    const subgraphRepository = initializeDecoratedSubgraphRepository();
    repositories.push(subgraphRepository);

    return repositories;
  }

  function getQueryArgs(options: PoolsRepositoryFetchOptions): GraphQLArgs {
    const tokensListFilterOperation = filterOptions?.isExactTokensList
      ? 'eq'
      : 'contains';

    const tokenListFormatted = filterTokens.value.map(address =>
      address.toLowerCase()
    );

    console.log(tokenListFormatted, 'tokenListFormatted');

    const orderBy = isBalancerApiDefined
      ? poolsSortField?.value
      : 'totalLiquidity';

    const queryArgs: GraphQLArgs = {
      chainId: configService.network.chainId,
      orderBy,
      orderDirection: 'desc',
      where: {
        tokensList: { [tokensListFilterOperation]: tokenListFormatted },
        poolType: { in: POOLS.IncludedPoolTypes },
        totalShares: { gt: 0.00001 },
        id: { not_in: POOLS.BlockList },
      },
    };
    if (queryArgs.where && filterOptions?.poolIds?.value) {
      queryArgs.where.id = { in: filterOptions.poolIds.value };
    }
    if (queryArgs.where && filterOptions?.poolAddresses?.value) {
      queryArgs.where.address = { in: filterOptions.poolAddresses.value };
    }
    if (options.first) {
      queryArgs.first = filterOptions?.first || options.first;
    }
    if (options.skip) {
      queryArgs.skip = options.skip;
    }
    return queryArgs;
  }

  function getFetchOptions(pageParam = 0): PoolsRepositoryFetchOptions {
    const fetchArgs: PoolsRepositoryFetchOptions = {};

    // Don't use a limit if there is a token list because the limit is applied pre-filter
    if (!filterTokens.value.length) {
      fetchArgs.first = filterOptions?.pageSize || POOLS.Pagination.PerPage;
    }

    if (pageParam && pageParam > 0) {
      fetchArgs.skip = pageParam;
    }

    return fetchArgs;
  }

  function customSort(pools: Pool[]): Pool[] {
    if (poolsSortField?.value === 'totalLiquidity') return pools;

    if (poolsSortField?.value === 'apr') {
      return pools.sort((a, b) => {
        const aprA = a?.apr?.max ?? 0;
        const aprB = b?.apr?.max ?? 0;
        return aprB - aprA;
      });
    } else if (poolsSortField?.value === 'volume') {
      return pools.sort((a, b) => {
        const volumeA = bnum(a?.totalSwapVolume ?? 0);
        const volumeB = bnum(b?.totalSwapVolume ?? 0);
        return volumeB.minus(volumeA).toNumber();
      });
    }

    return pools;
  }

  /**
   *  When filterTokens changes, re-initialize the repositories as their queries
   *  need to change to filter for those tokens
   */
  watch(
    () => [filterTokens, poolsSortField],
    () => {
      poolsRepository = initializePoolsRepository();
    },
    { deep: true }
  );

  /**
   * QUERY KEY
   */
  const queryKey = QUERY_KEYS.Pools.All(
    networkId,
    filterTokens,
    poolsSortField,
    filterOptions?.poolIds,
    filterOptions?.poolAddresses
  );

  /**
   * QUERY FUNCTION
   */
  const queryFn = async ({ pageParam = 0 }) => {
    const fetchOptions = getFetchOptions(pageParam);
    let skip = 0;
    try {
      let pools: Pool[] = await poolsRepository.fetch(fetchOptions);
      if (!isBalancerApiDefined) pools = customSort(pools);

      poolsStoreService.addPools(pools);

      skip = poolsRepository.currentProvider?.skip
        ? poolsRepository.currentProvider.skip
        : poolsStoreService.pools.value?.length || 0;

      return {
        pools,
        skip,
      };
    } catch (e) {
      const savedPools = poolsStoreService.pools.value;
      if (savedPools && savedPools.length > 0) {
        return { pools: savedPools, skip };
      }
      throw e;
    }
  };

  options.getNextPageParam = (lastPage: PoolsQueryResponse) =>
    lastPage.skip || 0;

  return useInfiniteQuery<PoolsQueryResponse>(queryKey, queryFn, options);
}
