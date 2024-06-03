import { vi } from 'vitest';

import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '../modules/auth/authStore';
import { useAppStore } from '../modules/app/appStore';
import { flushPromises, mount } from '@vue/test-utils';

import App from '../modules/app/pages/App.vue';

describe('App tests', () => {
  const pinia = createTestingPinia();

  test('should call initial functions from store', async () => {
    const authStore = useAuthStore(pinia);
    const appStore = useAppStore(pinia);

    authStore.refresh = vi.fn();
    appStore.getFinanceSettings = vi.fn();

    const refreshSpy = vi.spyOn(authStore, 'refresh');
    const getFinanceSettingsSpy = vi.spyOn(appStore, 'getFinanceSettings');

    mount(App, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    expect(refreshSpy).toHaveBeenCalledTimes(1);
    expect(getFinanceSettingsSpy).toHaveBeenCalledTimes(1);
  });
});
