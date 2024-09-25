<script setup lang="ts">
const navigateTo = (path: string) => {
  window.open(path, '_blank');
};
</script>

<template>
  <div class="tw-text-white tw-flex tw-flex-auto tw-flex-col animated fadeIn">

    <div class="tw-flex tw-flex-grow-0 tw-items-center tw-justify-center tw-mb-8 tw-w-full section-title">
      <h2>Welcome</h2>
    </div>

    <div class="tw-flex tw-flex-auto tw-items-center tw-mb-4 tw-w-full">
      <p>
        The Trading App is a Vue.js-based project designed to fetch and display real-time cryptocurrency data from an
        external API. It leverages Vue 3 for the frontend, along with Tailwind CSS for responsive and modern UI styling.
        The app is integrated with Auth0 for authentication and security purposes.
      </p>
    </div>

    <div class="tw-flex tw-flex-auto tw-items-center tw-mb-4 tw-w-full">
      <p>
        The app is hosted on Hostinger's VPS and controlled via CyberPanel, with a self-signed SSL certificate in place.
        It is also deployed through Netlify for additional hosting, using configurations like _headers and _redirects
        files. Vite is used as the build tool, ensuring efficient bundling and fast development. Additionally, the app
        fetches cryptocurrency prices from https://api.coindesk.com/v1/bpi/currentprice.json and updates at regular
        intervals.
      </p>
    </div>

    <div class="tw-flex tw-flex-auto tw-items-center tw-mb-8 tw-w-full">
      <p>
        For visuals, the app includes a chart that displays price data, which is passed between components using props,
        and Tailwind CSS is applied for layout styling. A clock is planned for the footer, and authentication is managed
        through Auth0, with the app set up for future scalability.
      </p>
    </div>

    <div class="tw-flex tw-flex-auto tw-items-center tw-justify-center tw-mb-8 tw-w-full">
      <div class="tw-flex tw-flex-auto tw-flex-col tw-justify-center tw-items-center">
        <h3>How to use the app?</h3>
        <ol class="tw-flex tw-flex-col tw-gap-2">
          <li>Open the app in your browser at <a href="https://tradingapp.pete85.com" class="tw-text-amber-300">https://tradingapp.pete85.com</a>.
          </li>
          <li>Click on the "Login" button (top right corner).</li>
          <li>You will be redirected to the <strong>Auth0</strong> login page.</li>
          <li>Enter the following credentials:
            <ul>
              <li><strong>U</strong>: tradingapp@test.co.uk</li>
              <li><strong>P</strong>: Tr@dingAPP2024</li>
            </ul>
          </li>
          <li>Click "Log In."</li>
          <li>You should now be authenticated and redirected back to the app.</li>
          <li>Navigate to Dashboard</li>
        </ol>
      </div>
    </div>

    <div class="dashboard-description tw-flex tw-flex-auto tw-items-center tw-mb-8 tw-bg-slate-100 tw-text-slate-800 tw-p-5 tw-rounded-lg tw-shadow-slate400">
      <div>
        <h3>Dashboard</h3>
        <p>
          In the Dashboard page of your app, cryptocurrency pricing data is displayed, with the latest price fetched
          from an external API every 25 seconds. The chart visualizing the price trends is updated every minute, showing
          a maximum of the last 5 prices at any time.
        </p>
        <ul class="tw-flex tw-flex-col tw-gap-2">
          <li>The pricing data is fetched from the API at <strong>25-second intervals</strong>.</li>
          <li>The chart displaying price trends is <strong>updated every minute</strong>, reflecting the most recent data.</li>
          <li>The chart shows a maximum of the <strong>last 5 price points</strong>, removing the oldest price when a new one is added.</li>
          <li>The page is part of a <strong>protected route</strong>, and users must be authenticated to access it. Non-authenticated users are redirected to the login page.</li>
        </ul>
      </div>
    </div>

    <div class="tw-flex tw-flex-auto tw-flex-col tw-justify-center tw-items-center tw-mb-8 tw-gap-5 tw-w-full">
      <h3>Useful links</h3>
      <div class="tw-flex tw-flex-auto tw-flex-wrap tw-items-center tw-justify-center tw-mb-8 tw-gap-4 tw-w-full">
        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://github.com/pete85/trading-app-vue')">
          <font-awesome-icon :icon="['fab', 'github']"/>
          <span>Github repo</span>
        </button>

        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://www.netlify.com/')">
          <font-awesome-icon :icon="['fas', 'server']"/>
          <span>Netlify</span>
        </button>

        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://vuejs.org/')">
          <font-awesome-icon :icon="['fab', 'vuejs']"/>
          <span>VueJS</span>
        </button>

        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://tailwindcss.com/')">
          <font-awesome-icon :icon="['fas', 'spray-can']"/>
          <span>Tailwind</span>
        </button>

        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://auth0.com/')">
          <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>
          <span>Auth0</span>
        </button>

        <button
            class="tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-py-1 tw-px-4 tw-gap-2 tw-rounded-lg"
            @click="navigateTo('https://pete85.com')">
          <img alt="pete85 logo" class="tw-w-5" src="../assets/images/pete85_bulb.png"/>
          <span>pete85</span>
        </button>
      </div>
    </div>

  </div>
</template>
