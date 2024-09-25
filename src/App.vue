<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Home from '@/components/Home.vue';

const currentTime = ref(new Date().toLocaleTimeString());

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
      <div class="tw-p-1">
        <img alt="Vue logo" class="logo" src="./assets/images/pete85_bulb.png"/>
      </div>
      <div class="tw-hidden md:tw-block">
        <h1 class="tw-mb-0 tw-text-white">Trading App</h1>
      </div>
    </div>
  </header>

  <main class="tw-flex tw-flex-auto tw-flex-col lg:tw-flex-row tw-p-5 tw-gap-12">
    <Home :latestPrice="latestPrice" :prices="prices" class="tw-flex tw-basis-0 tw-flex-grow-[4]" v-memo="[latestPrice]" />
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
