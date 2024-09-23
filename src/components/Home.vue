<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';

const props = defineProps({
  latestPrice: {
    type: Object,
    default: null
  }
});
// const latestPriceTime = format(props.latestPrice.time.updated, '');
</script>

<template>
  <div class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">
    <h2>Latest Bitcoin Price</h2>
    <div v-if="latestPrice" class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">

      <div class="tw-flex tw-flex-auto">
        <h4>Date: {{ latestPriceDate }}</h4>
<!--        <h4>Time: {{ latestPriceDate }}</h4>-->
      </div>

      Time: {{ latestPrice.time.updated }} | USD: {{ latestPrice.bpi.USD.rate }} | GBP: {{ latestPrice.bpi.GBP.rate }} | EUR: {{ latestPrice.bpi.EUR.rate }}
    </div>
  </div>
</template>
