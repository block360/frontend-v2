<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import AppLogo from '@/components/images/AppLogo.vue';
import useAlerts from '@/composables/useAlerts';
// import useBreakpoints from '@/composables/useBreakpoints';
import useFathom from '@/composables/useFathom';
import useNetwork from '@/composables/useNetwork';

import AppNavActions from './AppNavActions.vue';
import AppNavAlert from './AppNavAlert.vue';

/**
 * STATE
 */
const appNav = ref<HTMLDivElement>();

/**
 * COMPOSABLES
 */
// const { bp } = useBreakpoints();
const { trackGoal, Goals } = useFathom();
const { currentAlert } = useAlerts();
const { networkSlug } = useNetwork();

/**
 * METHODS
 */
function handleScroll() {
  if (!appNav.value) return;

  if (window.scrollY === 0) {
    appNav.value.classList.remove('shadow-lg');
  } else {
    appNav.value.classList.add('shadow-lg');
  }
}

/**
 * LIFECYCLE
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <AppNavAlert v-if="currentAlert" :alert="currentAlert" />
  <nav id="app-nav" ref="appNav">
    <div id="app-nav-content" class="flex justify-between items-center h-full">
      <div class="flex items-center h-full">
        <router-link
          :to="{ name: 'home', params: { networkSlug } }"
          @click="trackGoal(Goals.ClickNavLogo)"
        >
          <AppLogo />
        </router-link>

        <!-- GSUprotocol -->
        <!-- <DesktopLinks v-if="isDesktop" class="ml-8 font-medium" /> -->
      </div>

      <AppNavActions />
    </div>
  </nav>
</template>

<style scoped>
#app-nav {
  @apply w-full z-30;
  @apply bg-white dark:bg-gray-900;
  @apply border-b border-transparent;

  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: transparent;
  padding: 14px 16px 8px;
  height: 82px;

  /* margin-top: 40px; */

  /* margin-bottom: 20px; */

  /* padding-bottom: 40px; */
}

#app-nav-content {
  max-width: 750px;
  width: 100%;
}
</style>
