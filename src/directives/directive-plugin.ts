import type { App } from 'vue';
import { price } from '@/directives/price';
import { tooltip } from '@/directives/tooltip';
import { date } from '@/directives/date';

export const DirectivePlugin = {
  install(app: App) {
    app.directive('price', price);
    app.directive('tooltip', tooltip);
    app.directive('date', date);
  }
};
