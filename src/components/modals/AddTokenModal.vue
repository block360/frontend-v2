<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import QrcodeVue from 'qrcode.vue';

const address = process.env.VUE_APP_GSUAddress;

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);

function onClose() {
  emit('close');
}
</script>

<template>
  <BalModal show @close="onClose">
    <div
      id="simpleDeposit"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div :onclick="onClose" style="cursor: pointer">
            <span
              class="float-right material-icons clos text-red"
              data-dismiss="modal"
              aria-label="Close"
              >close</span
            >
          </div>
          <div class="modal-body">
            <strong class="text-center d-block text-dark"
              >{{ t('Add') }} GSU {{ t('TokenTo') }} <br />
              {{ t('YourWallet') }}</strong
            >
            <div class="text-center">
              <div class="mt-4 mb-5">
                <QrcodeVue
                  :value="address"
                  :size="120"
                  level="M"
                  foreground="#0d2945"
                ></QrcodeVue>
              </div>
              <address class="for-copy">{{ address }}</address>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BalModal>
</template>

