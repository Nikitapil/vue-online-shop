import './assets/main.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import { createApp } from 'vue';
import App from './modules/app/pages/App.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { validation } from '@/plugins/validation';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.use(validation);

app.mount('#app');
