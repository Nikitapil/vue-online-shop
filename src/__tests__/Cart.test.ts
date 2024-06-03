import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { api } from '../api/apiInstance';
import { mockCart } from './mocks/cart-mocks';
import { mockOrder } from './mocks/order-mocks';
import { flushPromises, mount } from '@vue/test-utils';
import Cart from '../modules/cart/components/Cart.vue';
import { i18n } from '../plugins/i18n';
import { validation } from '../plugins/validation';
import { useAuthStore } from '../modules/auth/authStore';
import { userMocks } from './mocks/user-mocks';
import CreateOrderModal from '../modules/cart/components/CreateOrderModal.vue';
import Drawer from '../components/ui/Drawer.vue';
import { toast } from 'vue3-toastify';
import { router } from '../router';

describe('Cart tests', () => {
  let pinia = createPinia();

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Should not change states if create order fails', async () => {
    api.createOrder = async () => {
      throw new Error();
    };
    api.getCart = async () => mockCart;

    const toastSpy = vi.spyOn(toast, 'success');
    const routerSpy = vi.spyOn(router, 'push');

    const authStore = useAuthStore();

    authStore.user = userMocks;

    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const openCartBtn = wrapper.find('[data-testid="open-cart-btn"]');

    await openCartBtn.trigger('click');

    const createOrderBtn = wrapper.find('[data-testid="create-order-btn"]');

    await createOrderBtn.trigger('click');

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    const modal = wrapper.findComponent(CreateOrderModal);
    const drawer = wrapper.findComponent(Drawer);

    expect(modal.props('modelValue')).toBe(true);
    expect(drawer.props('modelValue')).toBe(true);
    expect(toastSpy).toHaveBeenCalledTimes(0);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

  test('Should create order correctly', async () => {
    api.createOrder = async () => ({ cart: mockCart, order: mockOrder });
    api.getCart = async () => mockCart;

    const toastSpy = vi.spyOn(toast, 'success');
    const routerSpy = vi.spyOn(router, 'push');

    const authStore = useAuthStore();

    authStore.user = userMocks;

    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const openCartBtn = wrapper.find('[data-testid="open-cart-btn"]');

    await openCartBtn.trigger('click');

    const createOrderBtn = wrapper.find('[data-testid="create-order-btn"]');

    await createOrderBtn.trigger('click');

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    const modal = wrapper.findComponent(CreateOrderModal);
    const drawer = wrapper.findComponent(Drawer);

    expect(modal.props('modelValue')).toBe(false);
    expect(drawer.props('modelValue')).toBe(false);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });

  test('Should work computed properies correctly', async () => {
    api.getCart = async () => mockCart;

    const authStore = useAuthStore();

    authStore.user = userMocks;

    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]
      }
    });

    expect((wrapper.vm as any).deliveryCost).toBe(0);
    expect((wrapper.vm as any).tax).toBe(0);
    expect((wrapper.vm as any).products).toEqual([]);
    expect((wrapper.vm as any).isCartButtonsDisabled).toBe(true);

    await flushPromises();

    expect((wrapper.vm as any).deliveryCost).toBe(mockCart.deliveryCost);
    expect((wrapper.vm as any).tax).toBe(mockCart.taxSum);
    expect((wrapper.vm as any).products).toEqual(mockCart.productInCart);
  });
});
