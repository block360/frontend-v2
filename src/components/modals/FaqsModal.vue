<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);

function onClose() {
  emit('close');
}
</script>

<template>
  <BalModal show @close="onClose">
    <div>
      <!-- Modal -->
      <div
        id="faqs"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="supportLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        >
          <div class="modal-content">
            <div :onclick="onClose" style="cursor: pointer">
              <span
                class="float-right material-icons clos text-red"
                data-dismiss="modal"
                aria-label="Close"
                >close</span
              >
            </div>
            <div class="text-center">
              <h5 class="mb-2 text-red font-weight-bold">{{ t('FAQ') }}</h5>
              <small class="mb-3 d-block">
                {{ t('OfferingAccess') }}
              </small>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="mb-3 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{{ t('Q1') }}</h5>
                      <p class="card-text">{{ t('A1') }}</p>
                    </div>
                  </div>
                </div>
                <div class="mb-3 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{{ t('Q2') }}</h5>
                      <p class="card-text">{{ t('A2') }}</p>
                    </div>
                  </div>
                </div>
                <div class="mb-3 col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{{ t('Q3') }}</h5>
                      <p class="card-text">
                        {{ t('A3') }}
                        <a href="https://walletconnect.org/apps" target="_blank"
                          >https://walletconnect.org/apps</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BalModal>
</template>


