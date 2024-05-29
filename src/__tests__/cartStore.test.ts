import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises } from '@vue/test-utils';

import { api } from '../api/apiInstance';
import { mockCart } from './mocks/cart-mocks';
import { mockOrder } from './mocks/order-mocks';

import { useCartStore } from '../modules/cart/cartStore';

describe('CartStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should load cart correctly', async () => {
    api.getCart = async () => mockCart;
    const store = useCartStore();
    store.loadCart();

    expect(store.isCartLoading).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(mockCart);
    expect(store.isCartLoading).toBe(false);
  });

  test('should add product to cart correctly', async () => {
    api.addToCart = async () => mockCart;
    const store = useCartStore();
    store.addToCart();

    expect(store.isChangeInCartCountInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(mockCart);
    expect(store.isChangeInCartCountInProgress).toBe(false);
  });

  test('should return false if add to cart error', async () => {
    api.addToCart = async () => {
      throw new Error();
    };
    const store = useCartStore();
    store.addToCart();

    expect(store.isChangeInCartCountInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(null);
    expect(store.isChangeInCartCountInProgress).toBe(false);
  });

  test('should remove product from cart correctly', async () => {
    api.removeFromCart = async () => mockCart;
    const store = useCartStore();
    store.removeFromCart();

    expect(store.isChangeInCartCountInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(mockCart);
    expect(store.isChangeInCartCountInProgress).toBe(false);
  });

  test('should return false if add to cart error', async () => {
    api.removeFromCart = async () => {
      throw new Error();
    };
    const store = useCartStore();
    store.removeFromCart();

    expect(store.isChangeInCartCountInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(null);
    expect(store.isChangeInCartCountInProgress).toBe(false);
  });

  test('should create order correctly', async () => {
    api.createOrder = async () => ({ cart: mockCart, order: mockOrder });
    const store = useCartStore();
    store.createOrder({});

    expect(store.isCreateOrderInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(mockCart);
    expect(store.isCreateOrderInProgress).toBe(false);
  });

  test('should clear cart correctly', async () => {
    api.clearCart = async () => mockCart;
    const store = useCartStore();
    store.clearCart();

    expect(store.isChangeInCartCountInProgress).toBe(true);

    await flushPromises();

    expect(store.cart).toEqual(mockCart);
    expect(store.isChangeInCartCountInProgress).toBe(false);
  });
});
