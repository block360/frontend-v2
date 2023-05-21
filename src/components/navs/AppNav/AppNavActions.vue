<script lang="ts" setup>
// import { computed } from 'vue';

import useBreakpoints from '@/composables/useBreakpoints';
// import { useSidebar } from '@/composables/useSidebar';
import useWeb3 from '@/services/web3/useWeb3';

import AppNavAccountBtn from './AppNavAccountBtn.vue';
import AppNavActivityBtn from './AppNavActivityBtn/AppNavActivityBtn.vue';
import { Goals, trackGoal } from '@/composables/useFathom';
import AppNavDropdownLinks from './AppNavDropdownLinks.vue';
import useNativeBalance from '@/composables/useNativeBalance';

/**
 * COMPOSABLES
 */
const { isMobile } = useBreakpoints();
const { account, startConnectWithInjectedProvider } = useWeb3();
// const { setSidebarOpen } = useSidebar();

/**
 * COMPUTED
 */
// const hideNetworkSelect = computed(() => connector.value?.id === 'gnosis');
const { nativeBalance, nativeCurrency } = useNativeBalance();

/**
 * METHODS
 */
function connectWalletHandler() {
  trackGoal(Goals.ClickNavConnectWallet);
  startConnectWithInjectedProvider();
}
</script>

<template>
  <div>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
      <!-- GSUprotocol -->
      <!-- <DarkModeToggle v-if="isDesktop" /> -->
      <AppNavActivityBtn v-if="account" />
      <!-- <AppNavAccountBtn v-if="account" /> -->
      <BalBtn
        v-else
        color="white"
        :size="isMobile ? 'md' : 'sm'"
        @click="connectWalletHandler"
      >
        <!-- <WalletIcon class="mr-2" /> -->
        <span class="hidden lg:inline-block" v-text="$t('connectWallet')" />
        <span class="lg:hidden" v-text="$t('connect')" />
      </BalBtn>

      <div class="currency">
        {{ nativeCurrency }}
      </div>
      <div class="balance">
        {{ nativeBalance }}
      </div>

      <!-- GSUprotocol -->
      <!-- <AppNavNetworkSelect v-if="!hideNetworkSelect" /> -->
      <!-- <BalBtn
        v-if="isMobile"
        color="white"
        flat
        circle
        @click="setSidebarOpen(true)"
      >
        <BalIcon name="menu" size="lg" />
      </BalBtn> -->

      <AppNavDropdownLinks />
    </div>
    <div class="grid grid-rows-1 grid-flow-col gap-2 pt-1">
      <AppNavAccountBtn v-if="account" />
    </div>
  </div>
</template>

<style>
.currency {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: #133838;

  /* margin: 3px; */
  padding: 1px 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.balance {
  font-size: 15px;
  font-weight: 700;
  color: #f7ea22;
  background: #133838;

  /* margin: 3px; */
  padding: 1px 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


