<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  latestPrice: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <div>
    <h2>Latest Bitcoin Price</h2>
    <div v-if="latestPrice">
      Time: {{ latestPrice.time.updated }} | USD: {{ latestPrice.bpi.USD.rate }} | GBP: {{ latestPrice.bpi.GBP.rate }} | EUR: {{ latestPrice.bpi.EUR.rate }}
    </div>
  </div>
</template>
