<script setup lang="ts">
import { ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary chart elements
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Define props
const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
});

// Helper function to generate chart data from props
const generateChartData = (pricesArray) => {
  const labels = pricesArray.map(price => price.time.updateduk); // Use updateduk as labels (X-axis)

  const usdData = pricesArray.map(price => price.bpi.USD.rate_float);  // USD rates
  const gbpData = pricesArray.map(price => price.bpi.GBP.rate_float);  // GBP rates
  const eurData = pricesArray.map(price => price.bpi.EUR.rate_float);  // EUR rates

  return {
    labels,
    datasets: [
      {
        label: 'USD',
        data: usdData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'GBP',
        data: gbpData,
        backgroundColor: 'rgba(192, 75, 192, 0.2)',
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'EUR',
        data: eurData,
        backgroundColor: 'rgba(192, 192, 75, 0.2)',
        borderColor: 'rgba(192, 192, 75, 1)',
        borderWidth: 1,
      }
    ]
  };
};

// Initialize reactive chart data
const chartData = ref(generateChartData(props.prices));

// Watch for changes in the prices prop and update chart data reactively
watch(() => props.prices, (newPrices) => {
  chartData.value = generateChartData(newPrices);
}, { deep: true });

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    },
    tooltip: {
      enabled: true
    }
  }
};
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
