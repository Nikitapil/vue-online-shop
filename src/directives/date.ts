import type { Directive } from 'vue';

interface IDateDirectiveValue {
  date: string;
  options?: Intl.DateTimeFormatOptions;
}

export const date: Directive<HTMLElement, IDateDirectiveValue> = (el, bindings) => {
  el.textContent = new Date(bindings.value.date).toLocaleDateString('ru-RU', bindings.value.options);
};
