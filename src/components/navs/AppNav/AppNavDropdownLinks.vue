<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import FaqsModal from '@/components/modals/FaqsModal.vue';
import SupportModal from '@/components/modals/SupportModal.vue';
import AddTokenModal from '@/components/modals/AddTokenModal.vue';

// COMPOSABLES
const { t } = useI18n();

/**
 * METHODS
 */
function routeTo(url) {
  window.open(url, '_blank');
}
function handlePreviewButton(modalName) {
  if (modalName == 'FAQS') {
    modalFaqs.value = true;
  } else if (modalName == 'SUPPORT') {
    modalSupport.value = true;
  } else if (modalName == 'ADDTOKEN') [(modalAddToken.value = true)];
}
function handlePreviewModalClose() {
  modalFaqs.value = false;
  modalSupport.value = false;
  modalAddToken.value = false;
}

const modalFaqs = ref(false);
const modalSupport = ref(false);
const modalAddToken = ref(false);

// function openModal(id) {
//   $("#" + id).modal("show");
// }
</script>

<template>
  <div class="dropdown">
    <span class="material-icons">reorder</span>
    <div class="dropdown-menu dropdown-menu-right">
      <div
        class="dropdown-item"
        :onclick="() => handlePreviewButton('ADDTOKEN')"
      >
        <a>{{ t('AddGSUToYourWallet') }}</a>
      </div>
      <div class="dropdown-item">
        <a @click.prevent="routeTo('https://gsu.io/')">{{
          t('AboutTheGSU')
        }}</a>
      </div>
      <div class="dropdown-item" :onclick="() => handlePreviewButton('FAQS')">
        <a>{{ t('FAQ') }}</a>
      </div>
      <div
        class="dropdown-item"
        :onclick="() => handlePreviewButton('SUPPORT')"
      >
        <a>{{ t('Support') }}</a>
      </div>
      <div class="dropdown-item">
        <a href="https://github.com/gsu-protocol/frontend-v2" target="_blank">{{
          t('Code')
        }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('Discords') }}</a>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <FaqsModal v-if="modalFaqs" @close="handlePreviewModalClose" />
  </teleport>

  <teleport to="#modal">
    <SupportModal v-if="modalSupport" @close="handlePreviewModalClose" />
  </teleport>

  <teleport to="#modal">
    <AddTokenModal v-if="modalAddToken" @close="handlePreviewModalClose" />
  </teleport>
</template>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;

  /* background-color: rgb(255 255 255 / 90%); */
  background-image: linear-gradient(
    to right,
    rgb(113 36 212 / 75%),
    rgb(214 32 80 / 75%)
  );

  /* opacity: 80%; */

  /* left: 0; */

  /* right: 24.4%; */
  right: -22px;
  z-index: 1000;
  display: none;
  min-width: 12rem;

  /* padding: 10px 0; */

  /* margin: .125rem 0 0; */
  font-size: 1rem;

  /* font */
  color: white;
  text-align: left;
  list-style: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;

  /* background-color: transparent; */

  /* border-radius: 0.8rem; */

  /* border-top-right-radius: 0; */

  /* border: 1px solid #133838; */
}

.dropdown-item {
  font-size: 11px;
  font-weight: 800;
  padding: 5px 15px;
  line-height: 1;
  color: white;
  cursor: pointer;
}

.dropdown:hover .dropdown-menu {
  display: block;
  font-size: 27px;
  line-height: 0.6;
  padding: 5px 2px 8px 3px;
  margin-top: 0;
}

.dropdown {
  font-size: 1px;
  line-height: 0.6;
  padding: 5px 2px 0 3px;
  position: relative;
  right: 0;
  width: fit-content;
  margin-top: 0;
  margin-left: 6px;
  color: #7124d4;
}

.dropdown:hover {
  color: white;

  /* background-color: rgb(255 255 255 / 80%); */
  background-image: linear-gradient(
    to right,
    rgb(113 36 212 / 75%),
    rgb(214 32 80 / 75%)
  );

  /* opacity: 0.3; */

  /* border-radius: 10px; */
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  /* border-top-left-radius: 0.5rem; */

  /* border-top-right-radius: 0.5rem; */
  margin-bottom: 0;
}

.material-icons {
  /* color: #133838; */
  cursor: pointer;

  /* width: 36px; */

  /* height: 32px; */
  font-size: 32px;

  /* width: 0px; */
}

.dropdown-item:hover,
.dropdown-item.active {
  color: black;
  background-color: transparent;
}

.dropdown-menu-right {
  /* right: 0; */

  /* left: auto; */
  margin-right: 22px;
  margin-top: 0;
}
</style>