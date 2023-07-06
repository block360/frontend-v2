import { ref, onBeforeMount } from 'vue';
import { TokenListMap } from '@/types/TokenList';
import TokenListService from '@/services/token-list/token-list.service';
import { TokenInfoMap } from '@/types/TokenList';
import { getAddress } from '@ethersproject/address';
import useConfig from '@/composables/useConfig';

// STATE

export default function usePoolFilters(networkId) {
  const { networkConfig } = useConfig();
  const selectedTokens = ref<string[]>([]);
  let tokensListPromise;
  if (networkId == '1') {
    tokensListPromise = import(`@/assets/data/tokenlists/tokens-1.json`);
  } else if (networkId == '5') {
    tokensListPromise = import(`@/assets/data/tokenlists/tokens-5.json`);
  }

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

  onBeforeMount(async () => {
    const module = await tokensListPromise;
    // console.log(module.default, 'usePoolFilters');
    const tokenLists = module.default as TokenListMap;

    // filter token lists by network id
    let allTokenLists = {};
    allTokenLists = TokenListService.filterTokensList(tokenLists, networkId);

    const allTokenListTokens = Object.keys(mapTokenListTokens(allTokenLists));

    console.log(allTokenListTokens, 'allTokenLists');

    allTokenListTokens.map(tokenAdd => {
      addSelectedToken(tokenAdd);
    });
  });

  // const selectedTokens = ref<string[]>(["0x252D98faB648203AA33310721bBbDdfA8F1b6587","0x1f1f156E0317167c11Aa412E3d1435ea29Dc3cCE"]);

  function setSelectedTokens(addresses: string[]): void {
    selectedTokens.value = addresses;
  }

  function addSelectedToken(address: string): void {
    selectedTokens.value.push(address);
  }

  function removeSelectedToken(address: string): void {
    const tokenIndex = selectedTokens.value.indexOf(address);
    selectedTokens.value.splice(tokenIndex, 1);
  }

  return {
    // state
    selectedTokens,
    // methods
    setSelectedTokens,
    addSelectedToken,
    removeSelectedToken,
  };
}
