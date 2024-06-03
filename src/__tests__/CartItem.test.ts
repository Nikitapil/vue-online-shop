import { vi } from 'vitest';
import { computed } from 'vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { toast } from 'vue3-toastify';
import * as useProductComposable from '../composables/useProduct';

import { productInCartMock } from './mocks/product-in-cart-mock';

import CartItem from '../modules/cart/components/CartItem.vue';
import IconButton from '../components/ui/IconButton.vue';

describe('CartItem tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  test('should emit removeFromCart', async () => {
    const pinia = createTestingPinia();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia]
      },
      props: {
        productInCart: productInCartMock
      }
    });

    const removeBtn = wrapper.find('[data-testid="remove-from-cart"]');

    await removeBtn.trigger('click');

    expect(wrapper.emitted('removeFromCart')).toBeTruthy();
  });

  test('should disable remove btn while removing', async () => {
    const pinia = createTestingPinia();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia]
      },
      props: {
        productInCart: productInCartMock,
        isRemovingInProgress: true
      }
    });

    const removeBtn = wrapper.findComponent(IconButton);

    expect(removeBtn.props('disabled')).toBe(true);
  });

  test('should call add-to-cart', async () => {
    const pinia = createTestingPinia();

    const toastSpy = vi.spyOn(toast, 'info');

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia]
      },
      props: {
        productInCart: productInCartMock,
        isRemovingInProgress: true
      }
    });

    const addToCartBtn = wrapper.find('[data-testid="add-to-cart"]');

    await addToCartBtn.trigger('click');

    expect(toastSpy).toHaveBeenCalledTimes(1);
  });

  test('should be correct img src', async () => {
    const pinia = createTestingPinia();

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia]
      },
      props: {
        productInCart: productInCartMock,
        isRemovingInProgress: true
      }
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('http://localhost:5000asd');
  });

  test('should not render item if no product', async () => {
    const pinia = createTestingPinia();

    vi.spyOn(useProductComposable, 'useProduct').mockImplementationOnce(() => computed(() => null));

    const wrapper = mount(CartItem, {
      global: {
        plugins: [pinia]
      },
      props: {
        productInCart: productInCartMock,
        isRemovingInProgress: true
      }
    });

    const item = wrapper.find('[data-testid="cart-item"]');

    expect(item.exists()).toBe(false);

    vi.restoreAllMocks();
  });
});
