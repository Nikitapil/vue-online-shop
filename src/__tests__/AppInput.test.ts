import { flushPromises, mount } from '@vue/test-utils';
import AppInput from '../components/ui/AppInput/AppInput.vue';
import { validation } from '../plugins/validation';

describe('AppInput tests', () => {
  test('Should not render label if no prop', () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input'
      },
      attachTo: document.body
    });

    const label = wrapper.find('[data-testid="input-label"]');

    expect(label.exists()).toBe(false);
  });

  test('Should render label if prop exits', () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText
      }
    });

    const label = wrapper.find('[data-testid="input-label"]');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(labelText);
  });

  test('Label should fit for input', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText
      },
      attachTo: document.body
    });

    const label = wrapper.find('[data-testid="input-label"]');

    const input = wrapper.find('[data-testid="app-input"]');

    expect(label.attributes().for).toBe(input.attributes().id);
  });

  test('should not be disabled if no prop', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="app-input"]');

    await input.setValue('test');

    expect(wrapper.props('modelValue')).toBe('test');
  });

  test('should be disabled if prop', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText,
        disabled: true,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="app-input"]');

    await input.setValue('test');

    expect(wrapper.props('modelValue')).toBe('');
  });

  test('should validate correct', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText,
        rules: 'required',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      },
      global: {
        plugins: [validation]
      }
    });

    const input = wrapper.find('[data-testid="app-input"]');

    await input.trigger('focus');

    await input.trigger('blur');

    await flushPromises();

    const error = wrapper.find('[data-testid="input-error"]');

    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Test-input is required');
  });

  test('should applyMask correct', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        label: labelText,
        mask: 'numberMask',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="app-input"]');

    await input.setValue('abc');

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe('');

    await input.setValue('123');

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe('123');
  });
});
