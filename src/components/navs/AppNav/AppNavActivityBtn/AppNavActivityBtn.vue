<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import useNotifications from '@/composables/useNotifications';
import useTransactions from '@/composables/useTransactions';
import { cowswapProtocolService } from '@/services/cowswap/cowswapProtocol.service';
import { signOrderCancellation } from '@/services/cowswap/signing';
import useWeb3 from '@/services/web3/useWeb3';

import ActivityCounter from './ActivityCounter.vue';
import ActivityRows from './ActivityRows.vue';

/**
 * COMPOSABLES
 */
const { account, getSigner } = useWeb3();
const { t } = useI18n();

const {
  transactions,
  pendingTransactions,
  finalizedTransactions,
  getExplorerLink,
  clearAllTransactions,
  isSuccessfulTransaction,
  updateTransaction,
  isPendingTransactionStatus,
} = useTransactions();

const { addNotification } = useNotifications();

/**
 * METHODS
 */
async function cancelOrder(orderId: string) {
  try {
    const { signature, signingScheme } = await signOrderCancellation(
      orderId,
      getSigner()
    );

    await cowswapProtocolService.sendSignedOrderCancellation({
      cancellation: {
        orderUid: orderId,
        signature,
        signingScheme,
      },
      owner: account.value,
    });

    updateTransaction(orderId, 'order', {
      status: 'cancelling',
    });
  } catch (e) {
    console.log(e);
    addNotification({
      type: 'error',
      title: t('errorCancellingOrder'),
      message: (e as Error).message,
    });
  }
}
</script>

<template>
  <BalPopover noPad class="activity-card">
    <template #activator>
      <BalBtn
        color="white"
        :size="'sm'"
        class="relative p-1 activity-card-content"
      >
        <ActivityIcon v-if="pendingTransactions.length === 0" />
        <ActivityCounter v-else :count="pendingTransactions.length" />
      </BalBtn>
    </template>
    <BalCard class="w-72 activity-card" noPad noBorder>
      <template #header>
        <div
          class="flex justify-between items-center p-3 w-full border-b dark:border-gray-900"
        >
          <h5>{{ $t('recentActivityTitle') }}</h5>
        </div>
      </template>
      <div :class="['p-3', { 'h-72 overflow-auto': transactions.length > 5 }]">
        <template v-if="transactions.length > 0">
          <ActivityRows
            :transactions="pendingTransactions"
            :getExplorerLink="getExplorerLink"
            :isSuccessfulTransaction="isSuccessfulTransaction"
            :isPendingTransactionStatus="isPendingTransactionStatus"
            :cancelOrder="cancelOrder"
          />
          <div
            v-if="
              pendingTransactions.length > 0 && finalizedTransactions.length > 0
            "
            class="my-3 h-px bg-white-100 dark:bg-white-700"
          />
          <ActivityRows
            :transactions="finalizedTransactions"
            :getExplorerLink="getExplorerLink"
            :isSuccessfulTransaction="isSuccessfulTransaction"
            :isPendingTransactionStatus="isPendingTransactionStatus"
            :cancelOrder="cancelOrder"
          />
        </template>
        <template v-else>
          {{ $t('noRecentActivity') }}
        </template>
      </div>
      <template v-if="transactions.length > 0" #footer>
        <div class="p-3 w-full text-sm dark:bg-gray-800 rounded-b-lg">
          <a class="text-white-500" @click="clearAllTransactions()">
            {{ $t('clearTransactions') }}
          </a>
        </div>
      </template>
    </BalCard>
  </BalPopover>
</template>

<style>
.activity-card {
  /* background-color: #133838; */

  /* color: white; */

  /* height: 27px; */
  align-self: center;
  height: fit-content;
  margin-top: 2px;
}

.activity-card-content {
  background-color: transparent;
  color: white;
  align-self: center;
  height: fit-content;

  /* border-top-right-radius: 0px; */
  border: 1px solid rgb(172 169 169);
  border-radius: 0;
  height: 27px;
}

.activity-card-content:hover {
  background-color: transparent;

  /* color: white; */
}
</style>


