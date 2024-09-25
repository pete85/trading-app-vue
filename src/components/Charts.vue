<script setup lang="ts">
import {computed, ref, watch, onMounted, onUnmounted} from 'vue';
import {Line} from 'vue-chartjs';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const fullTailwindConfig = resolveConfig(tailwindConfig);
const innerWidth = ref(window.innerWidth);
const innerHeight = ref(window.innerHeight);
const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
});

/**
 * Helper function to generate chart data from props
 * @param pricesArray
 */
const generateChartData = (pricesArray) => {
  let labels = [...new Set(pricesArray.map(price => {
    const timeString = price.time.updateduk.split(' at ')[1];
    return timeString.split(' ')[0];
  }))];

  if (labels.length > 5) {
    labels = labels.slice(-5);
  }

  console.log('labels', labels);

  const usdData = pricesArray.map(price => price.bpi.USD.rate_float);
  const gbpData = pricesArray.map(price => price.bpi.GBP.rate_float);
  const eurData = pricesArray.map(price => price.bpi.EUR.rate_float);

  return {
    labels,
    datasets: [
      {
        label: 'USD',
        data: usdData,
        backgroundColor: fullTailwindConfig.theme.colors.blue["300"],
        borderColor: fullTailwindConfig.theme.colors.blue["600"],
        borderWidth: 2,
      },
      {
        label: 'GBP',
        data: gbpData,
        backgroundColor: fullTailwindConfig.theme.colors.red["300"],
        borderColor: fullTailwindConfig.theme.colors.red["600"],
        borderWidth: 2,
      },
      {
        label: 'EUR',
        data: eurData,
        backgroundColor: fullTailwindConfig.theme.colors.green["300"],
        borderColor: fullTailwindConfig.theme.colors.green["600"],
        borderWidth: 2,
      }
    ]
  };
};

const chartData = ref(generateChartData(props.prices));

watch(() => props.prices, (newPrices) => {
  chartData.value = generateChartData(newPrices);
}, { deep: true });

const myStyles = computed(() => {
  return {
    height: `350px`,
    width: `95%`,
    position: 'relative',
    maxWidth: '98%',
    // maxHeight: '98%',
    color: fullTailwindConfig.theme.colors.white
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: fullTailwindConfig.theme.colors.white,
        font: {
          family: 'Montserrat',
          size: 12,
        },
      },
      grid: {
        color: fullTailwindConfig.theme.colors.slate["400"],
      },
    },
    y: {
      ticks: {
        color: fullTailwindConfig.theme.colors.white,
        font: {
          family: 'Montserrat',
          size: 12,
        },
      },
      grid: {
        color: fullTailwindConfig.theme.colors.slate["400"],
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: fullTailwindConfig.theme.colors.white,
        font: {
          family: 'Montserrat',
          size: 16,
        },
      },
      position: 'top',
    },
    tooltip: {
      titleFont: {
        family: 'Montserrat',
        size: 16,
      },
      bodyFont: {
        family: 'Montserrat',
        size: 14,
      },
      backgroundColor: fullTailwindConfig.theme.colors.blue["800"],
      padding: 15
    },
  }
};

const updateWindowSize = () => {
  innerWidth.value = window.innerWidth;
  innerHeight.value = window.innerHeight;

  console.log('innerWidth', innerWidth);
  console.log('innerHeight', innerHeight);
};

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});
</script>

<template>
  <div class="tw-text-white tw-flex tw-flex-auto tw-flex-col tw-items-center tw-pb-12 tw-mb-4 lg:tw-mb-0  animated fadeIn">

    <div class="tw-flex tw-flex-grow-0 tw-items-center tw-justify-center tw-mb-8 tw-w-full section-title">
      <h2>Prices Chart</h2>
    </div>

    <div v-if="chartData" class="tw-flex tw-flex-auto tw-items-center tw-justify-center tw-flex-grow tw-w-full tw-px-8 animated fadeIn">
      <Line :data="chartData" :options="chartOptions" :style="myStyles" />
    </div>
  </div>
</template>
