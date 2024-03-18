import './assets/main.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import { createApp } from 'vue';
import App from './modules/app/pages/App.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { validation } from '@/plugins/validation';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { price } from './directives/price';
import { tooltip } from './directives/tooltip';
import { date } from './directives/date';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.use(validation);
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions);
// TODO read about typing for global directives, now they all are any in components
app.directive('price', price);
app.directive('tooltip', tooltip);
app.directive('date', date);

app.mount('#app');
