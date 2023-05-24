<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);

//DATA
const email = ref('');
const message = ref('');
const subject = ref('');
const btnLoad = ref(false);

function onClose() {
  emit('close');
}

function support() {
  // if (!email) {
  //     // $toasted.error("Email address is required");
  //     return;
  // } else if (!subject) {
  //     // $toasted.error("Subject is required");
  //     return;
  // } else if (!message) {
  //     // $toasted.error("Message is required");
  //     return;
  // } else if (!emailValidate(email)) {
  //     // $toasted.error("Invalid Email address");
  //     return;
  // }
  // btnLoad.value = true;
  // // var _that = this;
  // var xhttp = new XMLHttpRequest();
  // var data = new FormData();
  // data.append("email", email.val);
  // data.append("subject", subject);
  // data.append("message", message);
  // xhttp.onreadystatechange = function () {
  //     if (readyState == 4 && status == 200) {
  //         btnLoad.value = false;
  //         $("#support").modal("hide");
  //         email.value = "";
  //         subject.value = "";
  //         message.value = "";
  //         // $toasted.success("Message sent successfully!");
  //     }
  // };
  // xhttp.open("POST", "./community_mail.php", true);
  // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  // xhttp.send(data);
}
</script>

<template>
  <BalModal show @close="onClose">
    <div>
      <!-- Modal -->
      <div
        id="support"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="supportLabel"
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
            <div class="text-center">
              <h5 class="mb-2 text-red font-weight-bold">{{ t('Support') }}</h5>
              <small class="d-block">
                {{ t('OfferingAccess') }}
              </small>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input
                    v-model="email"
                    name="email"
                    type="text"
                    class="form-control"
                    autofocus
                    spellcheck="false"
                    :placeholder="t('YourEmail')"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="subject"
                    name="text"
                    type="text"
                    class="form-control"
                    autofocus
                    spellcheck="false"
                    :placeholder="t('Subject')"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="message"
                    class="form-control"
                    rows="4"
                    :placeholder="t('WriteYourMessageHere')"
                  ></textarea>
                </div>
                <div>
                  <button
                    v-if="btnLoad"
                    class="btn btn-confirm btn-block"
                    disabled
                  >
                    <LoadingGif />
                  </button>
                  <button
                    v-else
                    class="btn btn-confirm btn-block"
                    @click.prevent="support()"
                  >
                    {{ t('Send') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BalModal>
</template>


