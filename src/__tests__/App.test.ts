import { vi } from 'vitest';

import { i18n } from '../plugins/i18n';
import { router } from '../router';
import { DirectivePlugin } from '../directives/directive-plugin';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '../modules/auth/authStore';
import { useAppStore } from '../modules/app/appStore';
import { flushPromises, mount } from '@vue/test-utils';
import App from '../modules/app/pages/App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

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
        plugins: [i18n, pinia, router, DirectivePlugin, autoAnimatePlugin]
      }
    });

    await flushPromises();

    expect(refreshSpy).toHaveBeenCalledTimes(1);
    expect(getFinanceSettingsSpy).toHaveBeenCalledTimes(1);
  });
});
