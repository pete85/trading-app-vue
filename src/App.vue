<script setup>
import Home from "@/components/Home.vue";
</script>

<template>
  <header class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center tw-px-5">
    <div class="tw-flex tw-flex-auto tw-items-center">
      <div class="tw-p-1">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50"/>
      </div>
      <div>
        <h1 class="tw-mb-0 tw-text-white">Trading App</h1>
      </div>
    </div>
  </header>

  <main class="tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center tw-p-5">
    <Home v-if="data" :tradingData="data"/>
  </main>

  <footer class="tw-flex tw-flex-auto tw-flex-col tw-px-5 tw-items-center tw-justify-center">
    <div class="tw-flex tw-flex-auto tw-items-center tw-justify-center">
      <h4 class="tw-text-white">Author: <span>Piotr Furmanek</span></h4>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      // Leave data as reactive but assign non-reactive object later
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        const result = await response.json();
        // Store the plain object outside of Vue's reactivity system
        this.rawData = JSON.parse(JSON.stringify(result));
        this.data = result; // This will still be reactive
        console.log('RAW DATA (plain object): ', this.rawData);
        console.log('DATA (reactive): ', this.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
