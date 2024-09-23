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

  <main>
    <Home/>
  </main>

  <footer>
    <div class="tw-flex tw-flex-auto tw-flex-col tw-p-5">
      <h4 class="tw-text-white">Author: <span>Piotr Furmanek</span></h4>
    </div>
  </footer>
</template>
