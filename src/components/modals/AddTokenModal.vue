<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import QrcodeVue from 'qrcode.vue';
import useWeb3 from '@/services/web3/useWeb3';

const addressMainnet = '0x6CA37D0874D8540e6BA91d15267B880A572351B1';
const addressGoerli = '0x252D98faB648203AA33310721bBbDdfA8F1b6587';

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);
const { appNetworkConfig } = useWeb3();

function onClose() {
  emit('close');
}
</script>

<template>
  <BalModal show :isSwapView="true" @close="onClose">
    <div
      id="simpleDeposit"
      class="modal fade"
      style="
        background-image: linear-gradient(
          to right,
          rgb(113 36 212 / 75%),
          rgb(214 32 80 / 75%)
        );

        /* opacity: 0.75; */
        padding: 10px;
        border-radius: 20px;
        width: fit-content;
      "
    >
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
      >
        <div :onclick="onClose" style="cursor: pointer; align-self: flex-end">
          <span
            class="float-right material-icons close text-red"
            style="color: white; font-size: 30px"
            data-dismiss="modal"
            aria-label="Close"
            >close</span
          >
        </div>
        <strong
          class="mt-5 text-center text-white"
          style="font-size: 30px; font-weight: 100; line-height: 35px"
          >{{ t('Add') }} GSU {{ t('Token To') }} <br />
          {{ t('Your Wallet') }}</strong
        >
        <!-- <div class="text-center" style="align-self: center;"> -->
        <div class="mt-12 mb-12">
          <QrcodeVue
            :value="
              appNetworkConfig.chainId === 1 ? addressMainnet : addressGoerli
            "
            :size="180"
            level="M"
            foreground="#0d2945"
          ></QrcodeVue>
        </div>
        <address
          class="mb-12"
          style="
            /* border: 1px solid red; */
            background-image: linear-gradient(to right, #7124d4, #d62050);
            border-radius: 20px;
            padding: 10px;
            font-size: 15px;
            color: white;
          "
        >
          {{ appNetworkConfig.chainId === 1 ? addressMainnet : addressGoerli }}
        </address>
        <!-- </div> -->
      </div>
    </div>
  </BalModal>
</template>



