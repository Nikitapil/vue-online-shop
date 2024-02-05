import { ref } from 'vue';

export const useDebounce = <T extends () => void>(fn: T, delay = 300) => {
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
    timeoutId.value = setTimeout(fn, delay);
  };
};
