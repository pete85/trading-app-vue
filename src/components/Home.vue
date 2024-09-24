<script setup lang="ts">
import {defineProps, computed} from 'vue';
import {format, isValid, parseISO} from 'date-fns';
import {BitcoinPriceIndex} from "@/interfaces/trading-data";
import {parseCustomDate} from "@/utils/date-utils";
import {formatCurrency} from "@/utils/currency-utils";

const props = defineProps({
  latestPrice: {
    type: Object as () => BitcoinPriceIndex | null,
    default: null
  }
});

// Variables to hold formatted date and time
const latestPriceDate = computed(() => {
  if (props.latestPrice) {
    const parsedDate = parseCustomDate(props.latestPrice.time.updateduk);

    if (parsedDate) {
      return format(parsedDate, 'd MMMM yyyy');  // Format date as '24 September 2024'
    }
  }
  return 'Invalid date'; // Fallback value if date is invalid
});

const latestPriceTime = computed(() => {
  if (props.latestPrice) {
    const parsedDate = parseCustomDate(props.latestPrice.time.updateduk);

    if (parsedDate) {
      return format(parsedDate, 'HH:mm:ss');  // Format time as '09:49:00'
    }
  }
  return 'Invalid time'; // Fallback value if time is invalid
});

const formattedUSD = computed(() => {
  if (props.latestPrice) {
    return formatCurrency(props.latestPrice.bpi.USD.rate_float, 'USD');
  }
  return '';
});

const formattedGBP = computed(() => {
  if (props.latestPrice) {
    return formatCurrency(props.latestPrice.bpi.GBP.rate_float, 'GBP');
  }
  return '';
});

const formattedEUR = computed(() => {
  if (props.latestPrice) {
    return formatCurrency(props.latestPrice.bpi.EUR.rate_float, 'EUR');
  }
  return '';
});
</script>

<template>
  <div class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">
    <h2>Latest Bitcoin Price</h2>
    <div v-if="latestPrice" class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">

      <div class="tw-flex tw-flex-col tw-flex-auto tw-gap-2">
        <h4 v-if="latestPriceDate">
          <span class="tw-inline-block tw-font-light tw-w-20">Date:</span>
          <span>{{ latestPriceDate }}</span></h4>
        <h4 v-if="latestPriceTime">
          <span class="tw-inline-block tw-font-light tw-w-20">Time:</span>
          <span>{{ latestPriceTime }}</span>
        </h4>

        <div class="tw-flex tw-flex-auto tw-items-center">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/great-britain-50.png" alt="UK flag"/>
          </div>
          <h4>{{ formattedGBP }}</h4>
        </div>

        <div class="tw-flex tw-flex-auto tw-items-center">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/usa-50.png" alt="US flag"/>
          </div>
          <h4>{{ formattedUSD }}</h4>
        </div>

        <div class="tw-flex tw-flex-auto tw-items-center">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/eu-48.png" alt="EU flag"/>
          </div>
          <h4>{{ formattedEUR }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
