<script setup lang="ts">
import useWeb3 from '@/services/web3/useWeb3';
import { shorten } from '@/lib/utils';

import AppNavSettings from './AppNavSettings.vue';

const { disconnectWallet, account } = useWeb3();
</script>

<template class="address">
  <BalPopover noPad class="address">
    <template #activator>
      <!-- <BalBtn
        class="text-base address"
        :loading="isLoadingProfile"
        :loadingLabel="$t('connecting')"
        color="white"
      > -->
      <!-- <Avatar
          :iconURI="profile?.avatar || ''"
          :address="account"
        /> -->
      <div
        style="
          justify-content: end;
          align-items: end;
          display: flex;
          cursor: pointer;
        "
      >
        <span
          style="font-size: 11px; font-weight: 500; margin-right: 5px"
          v-text="`Addr:  `"
        />
        <span
          style="font-size: 11px; font-weight: 700; margin-right: 5px"
          v-text="shorten(account)"
        />
        <span
          style="font-size: 11px; font-weight: 700; margin-right: 5px"
          :onClick="disconnectWallet"
          v-text="`  |  Log out`"
        />
      </div>

      <!-- <span v-text="`Addr :${shorten(account)}`" /> -->
      <!-- </BalBtn> -->
    </template>
    <AppNavSettings />
  </BalPopover>
</template>

<style scoped>
.address {
  /* background-color: #133838; */
  color: black;
}
</style>


