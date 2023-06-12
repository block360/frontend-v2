<script setup lang="ts">
import { onMounted } from 'vue';
// import MyWallet from '@/components/cards/MyWallet/MyWallet.vue';
// import PairPriceGraph from '@/components/cards/PairPriceGraph/PairPriceGraph.vue';
import SwapCard from '@/components/cards/SwapCard/SwapCard.vue';
// import Col3Layout from '@/components/layouts/Col3Layout.vue';
import usePoolFilters from '@/composables/pools/usePoolFilters';
import useBreakpoints from '@/composables/useBreakpoints';
// import BridgeLink from '@/components/links/BridgeLink.vue';
// import { hasBridge } from '@/composables/useNetwork';
import { provideUserTokens } from '@/providers/local/user-tokens.provider';
// import AboutCard from '@/components/cards/AboutCard.vue';

/**
 * PROVIDERS
 */
provideUserTokens();

/**
 * COMPOSABLES
 */
const { setSelectedTokens } = usePoolFilters();
const { bp } = useBreakpoints();
// console.log(.value,"upToLargeBreakpoint");

/**
 * COMPUTED
 */
// const sections = computed(() => {
//   const sections = [
//     { title: 'My wallet', id: 'my-wallet' },
//     { title: 'Price chart', id: 'price-chart' },
//   ];
//   if (hasBridge.value) sections.push({ title: 'Bridge assets', id: 'bridge' });
//   return sections;
// });

/**
 * CALLBACKS
 */
onMounted(() => {
  // selectedPoolTokens are only persisted between the Home/Pool pages
  setSelectedTokens([]);
});
</script>

<template>
  <div class="main-content">
    <div
      :class="
        ['xs', 'sm', 'md', 'lg'].includes(bp) ? 'content-md' : 'content-lg'
      "
    >
      <!-- <AboutCard /> -->
      <SwapCard />
    </div>
  </div>
</template>

<style scoped>
.graph-modal {
  height: 450px;
}

.content-lg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
}

.content-md {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
}
</style>
