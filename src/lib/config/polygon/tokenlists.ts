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
    // 'https://unpkg.com/quickswap-default-token-list@1.0.67/build/quickswap-default.tokenlist.json',
  ],
};

export default tokenlists;
