import type { Directive } from 'vue';

export const tooltip: Directive<HTMLElement, string> = (el, bindings) => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = bindings.value;

  if (bindings.modifiers.right) {
    tooltip.classList.add('right');
  }

  el.style.position = 'relative';

  el.appendChild(tooltip);

  el.addEventListener('mouseenter', () => {
    if (bindings.value) {
      tooltip.style.display = 'block';
    }
  });

  el.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
};
