<template>
  <header class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center tw-px-5">
    <div class="tw-flex tw-flex-auto tw-items-center">
      <div class="tw-p-1">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50"/>
      </div>
      <div>
        <h1 class="tw-mb-0 tw-text-white">Trading App</h1>
      </div>
    </div>
  </header>

  <main class="tw-flex tw-flex-auto tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-p-5 tw-gap-5">
    <Home :latestPrice="latestPrice" class="tw-flex tw-basis-0 tw-flex-grow-[3]" />
    <Charts :prices="prices" class="tw-flex tw-basis-0 tw-flex-grow-[7]" />
  </main>

  <footer class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center">
    <div class="tw-flex tw-flex-auto tw-items-center tw-justify-between tw-w-full tw-gap-5">
      <div class="tw-flex tw-basis-0 tw-flex-grow-[7] tw-items-center tw-justify-start tw-p-5">
        <h4 class="tw-text-white">Author: <span>Piotr Furmanek</span></h4>
      </div>
      <div class="tw-flex tw-basis-0 tw-flex-grow-[3] tw-items-center tw-justify-end tw-p-5">
        <h4 class="tw-text-white">{{ currentTime }}</h4>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Home from '@/components/Home.vue';
import Charts from "@/components/Charts.vue";

const currentTime = ref(new Date().toLocaleTimeString());
const prices = ref([]);
const latestPrice = computed(() => prices.value.length > 0 ? prices.value[prices.value.length - 1] : null);

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
};

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    prices.value.push(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// On component mount, fetch data and set an interval
onMounted(() => {
  fetchData(); // Fetch once on load
  setInterval(fetchData, 30000); // Fetch every 15 seconds
  setInterval(updateTime, 1000);
});
</script>
