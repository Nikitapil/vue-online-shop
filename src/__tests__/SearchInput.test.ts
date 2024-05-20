import { mount } from '@vue/test-utils';
import SearchInput from '../components/ui/SearchInput.vue';
import { i18n } from '../plugins/i18n';

describe('SearchInput tests', () => {
  test('Should change value on input', async () => {
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="search-input"]');

    await input.setValue('123');

    expect(wrapper.props('modelValue')).toBe('123');
    expect(wrapper.emitted('input')).toBeTruthy();
  });

  test('Should should be disabled by prop', async () => {
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [i18n]
      },
      props: {
        disabled: true,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="search-input"]');

    await input.setValue('123');

    expect(wrapper.props('modelValue')).toBe('');
    expect(wrapper.emitted('input')).toBeFalsy();
  });
});
