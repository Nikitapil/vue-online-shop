import { flushPromises, mount } from '@vue/test-utils';
import { validation } from '../plugins/validation';

import AppTextarea from '../components/ui/AppInput/AppTextarea.vue';

describe('AppTextarea tests', () => {
  test('Should not render label if no prop', () => {
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area'
      }
    });

    const label = wrapper.find('[data-testid="area-label"]');

    expect(label.exists()).toBe(false);
  });

  test('Should render label if prop exits', () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area',
        label: labelText
      }
    });

    const label = wrapper.find('[data-testid="area-label"]');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(labelText);
  });

  test('Label should fit for area', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area',
        label: labelText
      },
      attachTo: document.body
    });

    const label = wrapper.find('[data-testid="area-label"]');

    const input = wrapper.find('[data-testid="area-input"]');

    expect(label.attributes().for).toBe(input.attributes().id);
  });

  test('should not be disabled if no prop', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area',
        label: labelText,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="area-input"]');

    await input.setValue('test');

    expect(wrapper.props('modelValue')).toBe('test');
  });

  test('should be disabled if prop', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area',
        label: labelText,
        disabled: true,
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="area-input"]');

    await input.setValue('test');

    expect(wrapper.props('modelValue')).toBe('');
  });

  test('should validate correct', async () => {
    const labelText = 'Test Label';
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-area',
        name: 'test-area',
        label: labelText,
        rules: 'required',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      },
      global: {
        plugins: [validation]
      }
    });

    const input = wrapper.find('[data-testid="area-input"]');

    await input.trigger('focus');

    await input.trigger('blur');

    await flushPromises();

    const error = wrapper.find('[data-testid="error-message"]');

    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Test-area is required');
  });
});
