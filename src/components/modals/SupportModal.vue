<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['swap', 'close']);

//DATA
const email = ref('');
const message = ref('');
const subject = ref('');
const btnLoad = ref(false);
const error = ref('');

function onClose() {
  emit('close');
}

// function emailValidate(email) {
//   if (email.value) {
//     let expression = "/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi";
//     let regex = new RegExp(expression);
//     if (email.value.match(regex)) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

// function support() {
//   if (!email.value) {
//     // $toasted.error("Email address is required");
//     error.value = 'Email address is required';
//     return;
//   } else if (!subject.value) {
//     // $toasted.error("Subject is required");
//     error.value = 'Subject is required';
//     return;
//   } else if (!message.value) {
//     // $toasted.error("Message is required");
//     error.value = 'Message is required';
//     return;
//   } else if (!emailValidate(email)) {
//     // $toasted.error("Invalid Email address");
//     error.value = 'Invalid Email address';

//     return;
//   }
//   btnLoad.value = true;
//   // var _that = this;
//   var xhttp = new XMLHttpRequest();
//   var data = new FormData();
//   data.append('email', email.value);
//   data.append('subject', subject.value);
//   data.append('message', message.value);
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       btnLoad.value = false;
//       onClose();
//       email.value = '';
//       subject.value = '';
//       message.value = '';
//       error.value = '';
//     }
//   };
//   xhttp.open('POST', './community_mail.php', true);
//   xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
//   xhttp.send(data);
// }
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
            rgb(113 36 212 / 75%),
            rgb(214 32 80 / 75%)
          );

          /* opacity: 0.75; */
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
                class="text-white"
                style="font-size: 30px; font-weight: 100; margin-left: 25px"
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
                  :placeholder="t('Your email')"
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
                  :placeholder="t('Write your message here')"
                  style="width: 100%"
                ></textarea>
              </div>
              <div class="mb-8" style="width: 100%; margin-top: 10px">
                <button v-if="btnLoad" class="swap-button" disabled>
                  <LoadingGif />
                </button>
                <button v-else class="swap-button">
                  {{ t('Send') }}
                </button>
              </div>

              <div style="color: red; font-weight: 1000; font-size: 15px">
                {{ error }}
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
  color: black;
}

.modal textarea.form-control {
  height: auto;
}

.swap-button {
  color: #fff;

  /* border: 1px solid #133838; */

  /* background-color: red; */
  background-image: linear-gradient(to right, #7124d4, #d62050);
  border-radius: 50px;
  width: 100%;
  height: 40px;

  /* margin-top: 25px; */
}
</style>
