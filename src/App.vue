<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import Home from '@/components/Home.vue';
import Dashboard from "@/components/Dashboard.vue";
import NotFound from "@/components/NotFound.vue";
import {useAuth0} from '@auth0/auth0-vue';

// Define routes
const routes = {
  '/': Home,
  '/dashboard': Dashboard
};

// Track the current path (now using window.location.pathname)
const currentPath = ref(window.location.pathname);

// Add a loading state to track if authentication is still being processed
const isLoading = ref(true);

// Auth0 integration
const {loginWithRedirect, user, isAuthenticated, isLoading: authLoading} = useAuth0();

watch(authLoading, (newValue) => {
  if (!newValue) {
    isLoading.value = false;
  }
});

const currentView = computed(() => {
  return routes[currentPath.value || '/'] || NotFound;
});

// Track active state for links
const isActive = (path: string) => currentPath.value === `${path}`;

// Update current time every second
const currentTime = ref(new Date().toLocaleTimeString());

const login = () => {
  loginWithRedirect();
};

const {logout} = useAuth0();

const logoutFromApp = () => {
  logout({logoutParams: {returnTo: window.location.origin}});
};

// Handle URL changes
window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname;
});

/**
 * Handle navigation logic
 */
const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  currentPath.value = path;
};

// Update time function
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
  requestAnimationFrame(updateTime);
};

onMounted(() => {
  setInterval(updateTime, 1000);
});
</script>


<template>
  <header class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center">
    <div class="tw-flex tw-flex-auto tw-items-center tw-gap-3">

      <div class="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-flex tw-items-center tw-ml-5">

        <div class="app-nav">
          <a href="/"
             :class="{'tw-text-slate-400 tw-opacity-50 tw-pointer-events-none': isActive('/'), 'tw-text-slate-200': !isActive('/')}"
             @click="navigateTo('/')">Home</a> |
          <a href="/dashboard"
             :class="{'tw-text-slate-400 tw-opacity-50 tw-pointer-events-none': isActive('/dashboard'), 'tw-text-slate-200': !isActive('/dashboard')}"
             @click="navigateTo('/dashboard')"
          >Dashboard</a>
        </div>
      </div>

      <div class="tw-p-1 tw-hidden sm:tw-block">
        <img alt="pete85 logo" class="logo" src="./assets/images/pete85_bulb.png"/>
      </div>
      <div class="tw-hidden lg:tw-block">
        <h1 class="tw-mb-0 tw-text-white">Trading App</h1>
      </div>
<!--      <div class="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-flex tw-items-center tw-mr-5" v-if="!isAuthenticated">-->
<!--        <button-->
<!--            class="tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-rounded-[50%] tw-size-12 tw-flex tw-items-center tw-justify-center tw-shadow-none"-->
<!--            @click="login">-->
<!--          <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>-->
<!--        </button>-->
<!--      </div>-->

<!--      <div class="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-flex tw-items-center tw-gap-3 tw-mr-5"-->
<!--           v-if="isAuthenticated">-->
<!--        <h4 class="tw-text-white tw-hidden md:tw-block">Hello {{ user.name }}</h4>-->
<!--        <button-->
<!--            class="tw-bg-red-900 tw-text-white tw-py-1 tw-px-4 tw-rounded-[50%] tw-size-12 tw-flex tw-items-center tw-justify-center tw-shadow-none"-->
<!--            @click="logoutFromApp">-->
<!--          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"/>-->
<!--        </button>-->
<!--      </div>-->
    </div>
  </header>

  <main class="tw-flex tw-flex-auto tw-flex-col lg:tw-flex-row tw-p-5 tw-gap-12">
    <component :is="currentView"/>
  </main>

  <footer class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center">
    <div class="tw-flex tw-flex-auto tw-items-center tw-justify-between tw-w-full tw-gap-5">
      <div class="tw-basis-0 tw-flex-grow-[7] tw-items-center tw-justify-start tw-p-5 tw-hidden md:tw-block">
        <h4 class="tw-text-white">Author: <span>Piotr Furmanek</span></h4>
      </div>
      <div class="tw-flex tw-basis-0 tw-flex-grow-[3] tw-items-center tw-justify-end tw-p-5">
        <h4 class="tw-text-white">{{ currentTime }}</h4>
      </div>
    </div>
  </footer>
</template>
