<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Home from '@/components/Home.vue';
import NotFound from "@/components/NotFound.vue";
import {useAuth0} from '@auth0/auth0-vue';

// Define routes
const routes = {
  '/': Home
};

// Track the current path (now using window.location.pathname)
const currentPath = ref(window.location.pathname);

// Determine the current view to render
const currentView = computed(() => {
  return routes[currentPath.value || '/'] || NotFound;
});

const {loginWithRedirect, user, isAuthenticated} = useAuth0();

// Update current time every second
const currentTime = ref(new Date().toLocaleTimeString());

const login = () => {
  loginWithRedirect();
};

const {logout} = useAuth0();

const logoutFromApp = () => {
  logout({logoutParams: {returnTo: window.location.origin}});
};

window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname;
});

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  currentPath.value = path;
};

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
        <button class="tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-rounded-lg" @click="navigateTo('/')">
          Home
        </button>
      </div>

      <div class="tw-p-1">
        <img alt="Vue logo" class="logo" src="./assets/images/pete85_bulb.png"/>
      </div>
      <div class="tw-hidden md:tw-block">
        <h1 class="tw-mb-0 tw-text-white">Trading App</h1>
      </div>
      <div class="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-flex tw-items-center tw-mr-5">
        <button class="tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-rounded-lg" @click="login">
          Login
        </button>
      </div>

      <div class="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-flex tw-items-center tw-mr-5" v-if="isAuthenticated">
        <p>{{user}}</p>
        <button class="tw-bg-red-900 tw-text-white tw-py-1 tw-px-4 tw-rounded-lg"
                @click="logoutFromApp">
          Logout
        </button>
      </div>
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
