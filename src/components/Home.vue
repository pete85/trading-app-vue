<script setup>
import { defineProps } from 'vue';

// Define the props passed from the parent component
const props = defineProps({
  tradingData: Object
});
</script>

<template>
  <div class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">
    <h2>Bitcoin Price Information</h2>
    <div v-if="tradingData">
      <p>Chart Name: {{ tradingData.chartName }}</p>
      <p>Updated Time: {{ tradingData.time.updated }}</p>
      <h3>BPI (Bitcoin Price Index):</h3>
      <ul>
        <li v-for="(currency, key) in tradingData.bpi" :key="key">
          {{ key }}: {{ currency.rate }} {{ currency.description }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading data...</p>
    </div>
  </div>
</template>