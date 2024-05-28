import { flushPromises, mount } from '@vue/test-utils';
import LogoutModal from '../modules/auth/components/LogoutModal.vue';
import { i18n } from '../plugins/i18n';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '../modules/auth/authStore';
import { vi } from 'vitest';

describe('LogoutModal tests', () => {
  test('should call logout method', async () => {
    const pinia = createTestingPinia();
    const wrapper = mount(LogoutModal, {
      global: {
        plugins: [i18n, pinia]
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
