import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import LogoutModal from '../modules/auth/components/LogoutModal.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '../modules/auth/authStore';

describe('LogoutModal tests', () => {
  test('should call logout method', async () => {
    const pinia = createTestingPinia();
    const wrapper = mount(LogoutModal, {
      global: {
        plugins: [pinia]
      },
      props: {
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const store = useAuthStore();

    const spyFn = vi.spyOn(store, 'logout').mockImplementation(async () => {});

    const confirmBtn = wrapper.find('[data-testid="confirm-button"]');

    await confirmBtn.trigger('click');

    await flushPromises();

    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(wrapper.props('modelValue')).toBe(false);
  });
});
