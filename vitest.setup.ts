import { config } from '@vue/test-utils';
import { i18n } from './src/plugins/i18n';
import { validation } from './src/plugins/validation';
import { router } from './src/router';
import { DirectivePlugin } from './src/directives/directive-plugin';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

config.global.plugins = [i18n, validation, router, DirectivePlugin, autoAnimatePlugin];
