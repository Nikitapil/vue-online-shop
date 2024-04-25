import type { Directive } from 'vue';

type TClickOutsideDirectiveValue = () => void;

type TElement = HTMLElement & { clickOutsideEvent?: (event: MouseEvent) => void };

export const clickOutside: Directive<TElement, TClickOutsideDirectiveValue> = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event?.target || el.contains(event?.target as Node))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    if (el.clickOutsideEvent) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};
