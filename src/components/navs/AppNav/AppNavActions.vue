<script lang="ts" setup>
// import { computed } from 'vue';

// import useBreakpoints from '@/composables/useBreakpoints';
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
// const { isMobile } = useBreakpoints();
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
    <div
      :style="
        account
          ? `display: flex;flex-direction: row;padding: 0px;margin-top: 15px;`
          : `display: flex;flex-direction: row;padding: 0px;margin-top: 0px;`
      "
    >
      <!-- GSUprotocol -->
      <!-- <DarkModeToggle v-if="isDesktop" /> -->
      <AppNavActivityBtn v-if="account" />
      <!-- <AppNavAccountBtn v-if="account" /> -->
      <BalBtn
        v-else
        color="white"
        class="wallet-connect"
        style="
          background-image: linear-gradient(to right, #7124d4, #d62050);
          color: white;
          height: 20px;
        "
        @click="connectWalletHandler"
      >
        <!-- <WalletIcon class="mr-2" /> -->
        <span class="hidden lg:inline-block" v-text="$t('connectWallet')" />
        <span class="lg:hidden" v-text="$t('connect')" />
      </BalBtn>

      <div v-if="account" class="currency">
        {{ nativeCurrency }}
      </div>
      <div v-if="account" class="balance">
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
    <div class="">
      <AppNavAccountBtn v-if="account" />
    </div>
  </div>
</template>

<style>
.currency {
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: transparent;

  /* background-image: linear-gradient(to right,rgb(153, 73, 255,0.75),#E94A74); */
  height: 27px;

  /* margin: 3px; */
  padding: 1px 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-left: 6px;
  border: 1px solid rgb(172 169 169);
  margin-top: 4px;
  background-image: linear-gradient(to right, #7124d4, #d62050);
  opacity: 0.8;
  border-radius: 6px;

  /* margin-top: 4px; */
}

.balance {
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: transparent;
  height: 27px;
  margin-left: 6px;

  /* margin: 3px; */
  padding: 1px 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  /* border: 1px solid rgb(172 169 169); */
  margin-top: 4px;
  background-image: linear-gradient(to right, #7124d4, #d62050);
  opacity: 0.8;
  border-radius: 6px;

  /* margin-top: 2px; */
}

.wallet-connect {
  /* background-color: transparent; */

  /* border-color: rgb(172 169 169);
  border-width: 1px;
  border-style: solid; */

  /* width: 117px; */

  /* height: 18px; */
  align-self: center;

  /* font-size: 13px; */
}

.wallet-connect:hover {
  background-color: transparent;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  opacity: 0.6;
  color: black;
}
</style>


