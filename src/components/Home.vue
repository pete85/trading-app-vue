<script setup lang="ts">
import {defineProps} from 'vue';
import {BitcoinPriceIndex} from "@/interfaces/trading-data";
import Charts from "@/components/Charts.vue";
import Prices from "@/components/Prices.vue";

const props = defineProps({
  latestPrice: {
    type: Object as () => BitcoinPriceIndex | null,
    default: null
  },
  prices: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <Prices :latestPrice="latestPrice" class="tw-flex tw-basis-0 tw-flex-grow-[4]" v-memo="[latestPrice]" />
  <Charts :prices="prices" class="tw-flex tw-basis-0 tw-flex-grow-[6]" v-memo="[prices]" />
</template>
