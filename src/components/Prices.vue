<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {format} from 'date-fns';
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
  <div class="tw-text-white tw-flex tw-flex-auto tw-flex-col tw-items-center animated fadeIn">

    <div class="tw-flex tw-flex-grow-0 tw-items-center tw-justify-center tw-mb-8 tw-w-full section-title">
      <h2>Bitcoin Price</h2>
    </div>

    <div v-if="latestPrice" class="tw-flex tw-flex-auto tw-flex-col tw-justify-center animated fadeIn">

      <div class="prices-overview tw-flex tw-flex-col tw-flex-auto tw-gap-2 tw-items-center tw-justify-center">
        <h4>{{ props.latestPrice.time.updated }}</h4>
        <h4>{{ props.latestPrice.time.updateduk }}</h4>

        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/great-britain-50.png" alt="UK flag"/>
          </div>
          <div class="tw-flex tw-w-[140px] tw-justify-end">
            <h3>{{ formattedGBP }}</h3>
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/usa-50.png" alt="US flag"/>
          </div>
          <div class="tw-flex tw-w-[140px] tw-justify-end">
            <h3>{{ formattedUSD }}</h3>
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/eu-48.png" alt="EU flag" class="tw-size-[50px]"/>
          </div>
          <div class="tw-flex tw-w-[140px] tw-justify-end">
            <h3>{{ formattedEUR }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
