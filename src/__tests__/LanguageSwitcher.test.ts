import { flushPromises, mount } from '@vue/test-utils';
import LanguageSwitcher from '../modules/app/components/LanguageSwitcher.vue';
import { i18n } from '../plugins/i18n';
import IconButton from '../components/ui/IconButton.vue';
import { DirectivePlugin } from '../directives/directive-plugin';

describe('LanguageSwitcher tests', () => {
  test('should be able to set languages', async () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n, DirectivePlugin]
      }
    });

    const dropdownOpener = wrapper.findComponent(IconButton);

    await dropdownOpener.trigger('click');

    await flushPromises();

    const options = wrapper.findAll('[data-testid="dropdown-switcher-option"]');

    await options[1].trigger('click');

    await flushPromises();

    expect(i18n.global.locale.value).toBe('rus');
  });
});
