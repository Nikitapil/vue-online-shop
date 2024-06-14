import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { validation } from '@/plugins/validation';
import { router } from '@/router';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { DirectivePlugin } from '@/directives/directive-plugin';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { i18n } from '@/plugins/i18n';

import 'vue3-toastify/dist/index.css';

import App from './modules/app/pages/App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.use(i18n);
app.use(validation);
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions);
app.use(DirectivePlugin);

app.mount('#app');
