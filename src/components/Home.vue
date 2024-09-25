<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue';
import {BitcoinPriceIndex} from "@/interfaces/trading-data";
import Charts from "@/components/Charts.vue";
import Prices from "@/components/Prices.vue";

// const props = defineProps({
//   latestPrice: {
//     type: Object as () => BitcoinPriceIndex | null,
//     default: null
//   },
//   prices: {
//     type: Array,
//     required: true
//   }
// });

const prices = ref<BitcoinPriceIndex | []>([]);
const latestPrice = computed(() => prices.value.length > 0 ? prices.value[prices.value.length - 1] : null);

/**
 * Fetch prices data
 */
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
});
</script>

<template>
  <Prices :latestPrice="latestPrice" class="tw-flex tw-basis-0 tw-flex-grow-[4]" v-memo="[latestPrice]" />
  <Charts :prices="prices" class="tw-flex tw-basis-0 tw-flex-grow-[6]" v-memo="[prices]" />
</template>
