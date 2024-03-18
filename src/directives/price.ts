import type { Directive } from 'vue';
import { formatPrice } from '@/helpers/formatters';

export const price: Directive<HTMLElement, number> = (el, bindings) => {
  const value = bindings.value;
  el.textContent = formatPrice(value);
};
