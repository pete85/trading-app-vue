import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import CanvasJSChart from '@canvasjs/vue-charts';

const app = createApp(App);
app.component('CanvasJSChart', CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.mount('#app');
