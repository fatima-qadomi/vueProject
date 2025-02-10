import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import { worker } from "./mocks/browser";

if (import.meta.env.MODE === "development") {
  worker.start();
}


const app = createApp(App);
app.use(router); 
app.mount('#app');


