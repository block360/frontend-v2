<script setup lang="ts">
import useWeb3 from '@/services/web3/useWeb3';
import { shorten } from '@/lib/utils';

import AppNavSettings from './AppNavSettings.vue';

const { isLoadingProfile, account } = useWeb3();
</script>

<template class="address">
  <BalPopover noPad class="address">
    <template #activator>
      <BalBtn
        class="text-base address"
        :loading="isLoadingProfile"
        :loadingLabel="$t('connecting')"
        color="white"
      >
        <!-- <Avatar
          :iconURI="profile?.avatar || ''"
          :address="account"
        /> -->

        <span class="inline-block pl-2 eth-address" v-text="shorten(account)" />
      </BalBtn>
    </template>
    <AppNavSettings />
  </BalPopover>
</template>

<style scoped>
.address {
  background-color: #133838;
  color: #fff;
}
</style>


