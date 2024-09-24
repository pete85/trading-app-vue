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

// const latestPriceTime = computed(() => {
//   if (props.latestPrice) {
//     const parsedDate = parseCustomDate(props.latestPrice.time.updateduk);
//
//     if (parsedDate) {
//       return format(parsedDate, 'HH:mm:ss');  // Format time as '09:49:00'
//     }
//   }
//   return 'Invalid time'; // Fallback value if time is invalid
// });
//
// const latestPriceDateUTC = computed(() => {
//   if (props.latestPrice) {
//     const parsedDate = parseCustomDate(props.latestPrice.time.updated);
//
//     if (parsedDate) {
//       return format(parsedDate, 'd MMMM yyyy');  // Format date as '24 September 2024'
//     }
//   }
//   return 'Invalid date'; // Fallback value if date is invalid
// });
//
// const latestPriceTimeUTC = computed(() => {
//   if (props.latestPrice) {
//     const parsedDate = parseCustomDate(props.latestPrice.time.updated);
//
//     if (parsedDate) {
//       return format(parsedDate, 'HH:mm:ss');  // Format time as '09:49:00'
//     }
//   }
//   return 'Invalid time'; // Fallback value if time is invalid
// });

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
  <div class="tw-flex tw-flex-auto tw-flex-col tw-items-center animated fadeIn">
    <h2>Latest Bitcoin Price</h2>
    <div v-if="latestPrice" class="tw-flex tw-flex-auto tw-flex-col animated fadeIn">

      <div class="prices-overview tw-flex tw-flex-col tw-flex-auto tw-gap-2 tw-items-center">
        <h4>{{ props.latestPrice.time.updated }}</h4>
        <h4>{{ props.latestPrice.time.updateduk }}</h4>

        <div class="tw-flex tw-flex-auto tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/great-britain-50.png" alt="UK flag"/>
          </div>
          <h4>{{ formattedGBP }}</h4>
        </div>

        <div class="tw-flex tw-flex-auto tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/usa-50.png" alt="US flag"/>
          </div>
          <h4>{{ formattedUSD }}</h4>
        </div>

        <div class="tw-flex tw-flex-auto tw-items-center tw-justify-between">
          <div class="tw-flex tw-w-20 tw-items-start tw-justify-start">
            <img src="../assets/images/eu-48.png" alt="EU flag" class="tw-size-[50px]"/>
          </div>
          <h4>{{ formattedEUR }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
