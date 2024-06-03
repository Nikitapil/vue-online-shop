import { createTestingPinia } from '@pinia/testing';
import { flushPromises, mount } from '@vue/test-utils';
import CurrencySwitcher from '../modules/app/components/CurrencySwitcher.vue';
import DropdownSwitcher from '../components/ui/DropdownSwitcher.vue';
import IconButton from '../components/ui/IconButton.vue';
import { useAppStore } from '../modules/app/appStore';
import { mockFinanceSettings } from './mocks/finance-settings';
import { DirectivePlugin } from '../directives/directive-plugin';

describe('CurrencySwitcher', () => {
  const pinia = createTestingPinia();

  test('should not show switcher if no financeSettings', () => {
    const wrapper = mount(CurrencySwitcher, {
      global: {
        plugins: [pinia]
      }
    });

    const dropdown = wrapper.findComponent(DropdownSwitcher);

    expect(dropdown.exists()).toBe(false);
  });

  test('should show switcher if financeSettings', async () => {
    const wrapper = mount(CurrencySwitcher, {
      global: {
        plugins: [pinia]
      }
    });

    const store = useAppStore(pinia);

    store.financeSettings = mockFinanceSettings;

    await flushPromises();

    const dropdown = wrapper.findComponent(DropdownSwitcher);

    expect(dropdown.exists()).toBe(true);
  });

  test('should have correct amount of options', async () => {
    const wrapper = mount(CurrencySwitcher, {
      global: {
        plugins: [pinia]
      }
    });

    const store = useAppStore(pinia);

    store.financeSettings = mockFinanceSettings;

    await flushPromises();

    const dropdown = wrapper.findComponent(DropdownSwitcher);

    expect(dropdown.props('options')).toEqual(['USD', 'RUB']);
  });

  test('should change currentCurrency', async () => {
    const wrapper = mount(CurrencySwitcher, {
      global: {
        plugins: [pinia]
      }
    });

    const store = useAppStore(pinia);

    store.financeSettings = mockFinanceSettings;

    await flushPromises();

    const dropdownOpener = wrapper.findComponent(IconButton);

    await dropdownOpener.trigger('click');

    await flushPromises();

    const options = wrapper.findAll('[data-testid="dropdown-switcher-option"]');

    await options[1].trigger('click');

    await flushPromises();

    expect(store.setCurrentCurrency).toHaveBeenCalledTimes(1);
  });
});
