import { TokenConstants } from '../types';

const tokens: TokenConstants = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'BAL', 'AAVE', 'WETH'],
  },
  InitialSwapTokens: {
    input: '0x6CA37D0874D8540e6BA91d15267B880A572351B1',
    output: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    BAL: '0xba100000625a3754423978a60c9317c58a424e3d',
    bbaUSD: '0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2',
    bbaUSDv2: '0xA13a9247ea42D743238089903570127DdA72fE44',
  },
  DisableInternalBalanceWithdrawals: [
    '0xEb91861f8A4e1C12333F42DCE8fB0Ecdc28dA716',
    '0x4d19F33948b99800B6113Ff3e83beC9b537C85d2',
    '0xe025E3ca2bE02316033184551D4d3Aa22024D9DC',
  ],
};

export default tokens;
