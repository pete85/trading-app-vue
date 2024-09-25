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
    <Home :latestPrice="latestPrice" class="tw-flex tw-basis-0 tw-flex-grow-[4]" v-memo="[latestPrice]" />
    <Charts :prices="prices" class="tw-flex tw-basis-0 tw-flex-grow-[6]" v-memo="[prices]" />
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Home from '@/components/Home.vue';
import Charts from "@/components/Charts.vue";
import { BitcoinPriceIndex } from '@/interfaces/trading-data';

const currentTime = ref(new Date().toLocaleTimeString());
const prices = ref<BitcoinPriceIndex | []>([]);
const latestPrice = computed(() => prices.value.length > 0 ? prices.value[prices.value.length - 1] : null);

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
  requestAnimationFrame(updateTime);
};

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data: BitcoinPriceIndex = await response.json();

    // Limit array size to 10
    if (prices.value.length >= 10) {
      prices.value.shift(); // Remove the oldest data
    }

    prices.value = [...prices.value, data];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// On component mount, fetch data and set an interval
onMounted(() => {
  fetchData(); // Fetch once on load
  setInterval(fetchData, 25000); // Fetch every 20 seconds
  setInterval(updateTime, 1000);
});
</script>
