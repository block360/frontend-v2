<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// COMPOSABLES
const { t } = useI18n();

/**
 * METHODS
 */
function routeTo(url) {
  window.open(url, '_blank');
}

// function openModal(id) {
//   $("#" + id).modal("show");
// }
</script>

<template>
  <div class="dropdown">
    <span class="material-icons">reorder</span>
    <div class="dropdown-menu dropdown-menu-right">
      <div class="dropdown-item">
        <a @click.prevent="routeTo('https://gsu.io/')">{{
          t('AddGSUToYourWallet')
        }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('AboutTheGSU') }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('FAQ') }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('Support') }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('Code') }}</a>
      </div>
      <div class="dropdown-item">
        <a>{{ t('Discords') }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;

  /* left: 0; */

  /* right: 24.4%; */
  right: -22px;
  z-index: 1000;
  display: none;
  min-width: 12rem;

  /* padding: 10px 0; */

  /* margin: .125rem 0 0; */
  font-size: 1rem;
  color: white;
  text-align: left;
  list-style: none;
  background-color: #133838;

  /* border-radius: 0.8rem; */
  border-top-right-radius: 0;
  border: 1px solid #133838;
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
  padding: 7px 4px 10px 5px;
  margin-top: 0;
}

.dropdown {
  font-size: 1px;
  line-height: 0.6;
  padding: 7px 4px 0 5px;
  position: relative;
  right: 0;
  width: fit-content;
  margin-top: 0;
  margin-left: 6px;
}

.dropdown:hover {
  color: white;
  background-color: #133838;

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
  color: #feed02;
  background-color: transparent;
}

.dropdown-menu-right {
  /* right: 0; */

  /* left: auto; */
  margin-right: 22px;
  margin-top: 0;
}
</style>