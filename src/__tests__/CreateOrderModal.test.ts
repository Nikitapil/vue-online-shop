import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import CreateOrderModal from '../modules/cart/components/CreateOrderModal.vue';
import { createPinia, setActivePinia } from 'pinia';
import Modal from '../components/ui/Modal.vue';
import { useAuthStore } from '../modules/auth/authStore';
import { userMocks } from './mocks/user-mocks';

describe('CreateOrderModal tests', () => {
  let pinia = createPinia();
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should be closed if modelValue is false', () => {
    const wrapper = mount(CreateOrderModal, {
      props: {
        modelValue: false,
        isLoading: false
      }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(false);
  });

  test('should be opened if modelValue is true', () => {
    const wrapper = mount(CreateOrderModal, {
      props: {
        modelValue: true,
        isLoading: false
      }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);
  });

  test('should disable inputs and buttons by loading prop', () => {
    const wrapper = mount(CreateOrderModal, {
      global: {
        plugins: [pinia]
      },
      props: {
        modelValue: true,
        isLoading: true
      }
    });

    const inputs = wrapper.findAll('input');
    const btns = wrapper.findAll('button');
    const textAreas = wrapper.findAll('textarea');
    const modal = wrapper.findComponent(Modal);

    expect(modal.props('preventClose')).toBe(true);

    const allElems = [...inputs, ...btns, ...textAreas];

    allElems.forEach((elem) => expect(elem.element.disabled).toBe(true));
  });

  test('should not emit create event if not valid', async () => {
    const wrapper = mount(CreateOrderModal, {
      global: {
        plugins: [pinia]
      },
      props: {
        modelValue: true,
        isLoading: true
      }
    });

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('create')).toBeFalsy();
  });

  test('should emit create event if not valid', async () => {
    const store = useAuthStore();

    store.user = userMocks;
    const wrapper = mount(CreateOrderModal, {
      global: {
        plugins: [pinia]
      },
      props: {
        modelValue: true,
        isLoading: true
      }
    });

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('create')).toBeTruthy();
  });
});
