import type { App } from 'vue';
import { tooltip } from '@/directives/tooltip';
import { date } from '@/directives/date';
import { clickOutside } from '@/directives/click-outside';

export const DirectivePlugin = {
  install(app: App) {
    app.directive('tooltip', tooltip);
    app.directive('date', date);
    app.directive('click-outside', clickOutside);
  }
};
