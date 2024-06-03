import { config } from '@vue/test-utils';
import { i18n } from './src/plugins/i18n';
import { validation } from './src/plugins/validation';
import { router } from './src/router';

config.global.plugins = [i18n, validation, router];
