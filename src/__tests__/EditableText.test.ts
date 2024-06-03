import { flushPromises, mount } from '@vue/test-utils';
import EditableText from '../components/ui/EditableText.vue';
import AppInput from '../components/ui/AppInput/AppInput.vue';

describe('EditableText tests', () => {
  test('should open edit mode correctly', async () => {
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue: 'Test InitialValue',
        modelValue: false,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
    let form = wrapper.find('[data-testid="editable-text-form"]');

    expect(form.exists()).toBe(false);

    const openBtn = wrapper.find('[data-testid="open-edit-mode"]');

    await openBtn.trigger('click');

    form = wrapper.find('[data-testid="editable-text-form"]');

    expect(form.exists()).toBe(true);
    expect(wrapper.props('modelValue')).toBe(true);
  });

  test('should validate correctly', async () => {
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue: '',
        rules: 'required',
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const form = wrapper.find('[data-testid="editable-text-form"]');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();
  });

  test('should submit if valid correctly', async () => {
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue: '123',
        rules: 'required',
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const form = wrapper.find('[data-testid="editable-text-form"]');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0][0]).toBe('123');
  });

  test('label should fit input', () => {
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue: '123',
        label: 'Test Label',
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const label = wrapper.find('[data-testid="editable-text-label"]');
    const input = wrapper.find('[data-testid="app-input"]');

    expect(label.attributes('for')).toBe(input.attributes('id'));
  });

  test('should be correct initialValue', async () => {
    const initialValue = '123';
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue,
        label: 'Test Label',
        modelValue: false,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const valueParagraph = wrapper.find('[data-testid="value-paragraph"]');

    expect(valueParagraph.text()).toBe(initialValue);

    const openBtn = wrapper.find('[data-testid="open-edit-mode"]');

    await openBtn.trigger('click');

    const input = wrapper.findComponent(AppInput);

    expect(input.props('modelValue')).toBe('123');
  });

  test('should disable all buttons', async () => {
    const initialValue = '123';
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue,
        label: 'Test Label',
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
  });

  test('should set initialValue and close on close', async () => {
    const initialValue = '123';
    const wrapper = mount(EditableText, {
      props: {
        id: 'test id',
        name: 'Test Name',
        initialValue,
        label: 'Test Label',
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('[data-testid="app-input"]');

    await input.setValue('456');

    const closeBtn = wrapper.find('[data-testid="close-button"]');

    await closeBtn.trigger('click');

    const valueParagraph = wrapper.find('[data-testid="value-paragraph"]');
    const closedMode = wrapper.find('[data-testid="closed-mode"]');

    expect(valueParagraph.text()).toBe(initialValue);
    expect(closedMode.exists()).toBe(true);
  });
});
