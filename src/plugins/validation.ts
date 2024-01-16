import { defineRule } from 'vee-validate';
import { capitalize } from 'vue';

export const validation = () => {
  defineRule('required', (value: string, params, ctx) => {
    if (!value || !value.length) {
      return `${capitalize(ctx.name) || 'This field'} is required`;
    }
    return true;
  });

  defineRule('requiredObj', (value: string, params, ctx) => {
    if (!value) {
      return `${capitalize(ctx.name) || 'This field'} is required`;
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
      return 'Invalid email value';
    }
    return true;
  });

  defineRule('minLength', (value: string, [param]: [string], ctx) => {
    if (value.length < +param) {
      return `${capitalize(ctx.name) || 'This field'} min length is ${param}`;
    }
    return true;
  });
};
