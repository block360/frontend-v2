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
  <BalModal show :isSwapView="true" @close="onClose">
    <div>
      <!-- Modal -->
      <div
        id="support"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="supportLabel"
        aria-hidden="true"
        style="
          background-image: linear-gradient(
            to right,
            rgb(211 157 235 / 60%),
            rgb(241 165 188 / 60%)
          );
          padding: 15px;
          border-radius: 20px;
          width: fit-content;
        "
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div
              :onclick="onClose"
              style="cursor: pointer; color: red; font-size: 30px"
            >
              <span
                class="float-right material-icons clos text-red"
                data-dismiss="modal"
                aria-label="Close"
                >close</span
              >
            </div>
            <div class="mt-8 mb-8 text-center">
              <strong
                class="text-black"
                style="font-size: 30px; font-weight: 100"
                >{{ t('Support') }}</strong
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-right: 30px;
                margin-left: 30px;
              "
            >
              <!-- <form> -->
              <div style="margin-top: 20px; width: 250px">
                <input
                  v-model="email"
                  name="email"
                  type="text"
                  class="form-control"
                  autofocus
                  spellcheck="false"
                  :placeholder="t('YourEmail')"
                  style="width: 100%; height: 40px"
                />
              </div>
              <div style="margin-top: 20px; width: 250px">
                <input
                  v-model="subject"
                  name="text"
                  type="text"
                  class="form-control"
                  autofocus
                  spellcheck="false"
                  :placeholder="t('Subject')"
                  style="width: 100%; height: 40px"
                />
              </div>
              <div style="margin-top: 20px; width: 250px">
                <textarea
                  v-model="message"
                  class="form-control"
                  rows="4"
                  :placeholder="t('WriteYourMessageHere')"
                  style="width: 100%"
                ></textarea>
              </div>
              <div class="mb-8" style="width: 100%; margin-top: 10px">
                <button v-if="btnLoad" class="swap-button" disabled>
                  <LoadingGif />
                </button>
                <button v-else class="swap-button" @click.prevent="support()">
                  {{ t('Send') }}
                </button>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </BalModal>
</template>

<style scoped>
.modal .form-control {
  font-size: 13px;
  padding: 5px 10px;
  height: 32px;
  box-shadow: none;
}

.modal textarea.form-control {
  height: auto;
}

.swap-button {
  color: #fff;

  /* border: 1px solid #133838; */
  background-color: red;
  border-radius: 50px;
  width: 100%;
  height: 40px;

  /* margin-top: 25px; */
}
</style>


