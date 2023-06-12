<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);

function onClose() {
  emit('close');
}
</script>

<template>
  <BalModal show :isSwapView="true" @close="onClose">
    <div>
      <!-- Modal -->
      <div
        id="faqs"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="supportLabel"
        aria-hidden="true"
        style="
          background-image: linear-gradient(
            to right,
            rgb(113 36 212 / 75%),
            rgb(214 32 80 / 75%)
          );

          /* opacity: 0.75; */
          padding: 15px;
          border-radius: 20px;
          width: fit-content;
        "
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        >
          <div class="modal-content">
            <div class="mt-8 mb-8 text-center">
              <div :onclick="onClose" style="cursor: pointer">
                <span
                  class="float-right material-icons clos text-red"
                  data-dismiss="modal"
                  aria-label="Close"
                  style="color: red; font-size: 30px"
                  >close</span
                >
              </div>
              <strong
                class="text-white"
                style="font-size: 30px; font-weight: 100; margin-left: 25px"
                >{{ t('FAQ') }}</strong
              >
              <!-- <small class="mb-3 d-block text-black">
                {{ t('OfferingAccess') }}
              </small> -->
            </div>
            <div class="mb-8 text-white modal-body">
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


