import { TokenListURLMap } from '@/types/TokenList';

const tokenlists: TokenListURLMap = {
  Balancer: {
    Default:
      // 'https://raw.githubusercontent.com/balancer/tokenlists/main/generated/listed-old.tokenlist.json',
      'https://raw.githubusercontent.com/block360/frontend-v2/update-on-hompage/generated/listed-old.tokenlist.json',
    Vetted:
      // 'https://raw.githubusercontent.com/balancer/tokenlists/main/generated/balancer.tokenlist.json',
      'https://raw.githubusercontent.com/block360/frontend-v2/update-on-hompage/generated/balancer.tokenlist.json',
  },
  External: [
    // 'ipns://tokens.uniswap.org',
    // 'https://www.gemini.com/uniswap/manifest.json',
  ],
};

export default tokenlists;
