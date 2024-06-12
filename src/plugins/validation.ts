import { capitalize } from 'vue';
import { defineRule } from 'vee-validate';

import { i18n } from '@/plugins/i18n';

export const validation = () => {
  defineRule('required', (value: string, params, ctx) => {
    if (!value || !value.length) {
      return `${capitalize(ctx.name) || i18n.global.t('this_field')} ${i18n.global.t('is_required')}`;
    }
    return true;
  });

  defineRule('requiredObj', (value: string, params, ctx) => {
    if (!value) {
      return `${capitalize(ctx.name) || i18n.global.t('this_field')} ${i18n.global.t('is_required')}`;
    }
    return true;
  });

  defineRule('email', (value: string) => {
    if (!value || !value.length) {
      return true;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      return i18n.global.t('invalid_email_value');
    }
    return true;
  });

  defineRule('minLength', (value: string, [param]: [string], ctx) => {
    if (value.length < +param) {
      return `${capitalize(ctx.name) || i18n.global.t('this_field')} ${i18n.global.t('min_length_is')} ${param}`;
    }
    return true;
  });
};
