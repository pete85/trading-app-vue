<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">
    <h2>Bitcoin Price Information</h2>

    <ul>
      <li v-for="(price, index) in prices" :key="index">
        Time: {{ price.time.updated }} | USD: {{ price.bpi.USD.rate }} | GBP: {{ price.bpi.GBP.rate }} | EUR: {{ price.bpi.EUR.rate }}
      </li>
    </ul>
  </div>
</template>