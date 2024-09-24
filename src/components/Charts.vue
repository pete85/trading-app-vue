<script setup lang="ts">
import { ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Register necessary chart elements
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

// Define props
const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
});

// Create a local reactive chartData instead of modifying props directly
const chartData = ref({
  labels: ['January', 'February', 'March'],  // Default labels
  datasets: [
    {
      label: 'Prices',
      data: props.prices || [],  // Use the passed prices prop or an empty array
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }
  ]
});

// Watch for changes in the prices prop and update chartData reactively
watch(() => props.prices, (newPrices) => {
  chartData.value.datasets[0].data = [...newPrices];  // Safely update data
});

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
