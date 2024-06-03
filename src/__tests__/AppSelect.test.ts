import type { ISelectOptions } from '../components/ui/AppSelect/types';
import { flushPromises, mount } from '@vue/test-utils';
import AppSelect from '../components/ui/AppSelect/AppSelect.vue';

describe('AppSelect tests', () => {
  const options: ISelectOptions[] = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' },
    { value: '5', name: '5' }
  ];

  test('Should render all options', () => {
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select'
      }
    });

    const optionsElements = wrapper.findAll('option');

    expect(optionsElements.length).toBe(5);
  });

  test('Should not render placeholder option if value', () => {
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        modelValue: '1'
      }
    });

    const placeholderElement = wrapper.find('[data-testid="app-select-placeholder"]');

    expect(placeholderElement.exists()).toBe(false);
  });

  test('Should render placeholder option if no value and placeholder', () => {
    const placeholder = 'select-placeholder';
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        placeholder,
        modelValue: ''
      }
    });

    const placeholderElement = wrapper.find('[data-testid="app-select-placeholder"]');

    expect(placeholderElement.exists()).toBe(true);
    expect(placeholderElement.text()).toBe(placeholder);
  });

  test('Should not be disabled and set value correctly', async () => {
    const placeholder = 'select-placeholder';
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        placeholder,
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const opts: any = wrapper.findAll('option');
    await opts?.at(1)?.setSelected();

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe('2');
  });

  test('Should be disabled if disabled prop passed as true', async () => {
    const placeholder = 'select-placeholder';
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        placeholder,
        disabled: true,
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const opts: any = wrapper.findAll('option');
    await opts?.at(1)?.setSelected();

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe('1');
  });

  test('Should be validated', async () => {
    const optsProps = [{ value: '', name: '0' }, ...options];
    const wrapper = mount(AppSelect, {
      props: {
        options: optsProps,
        name: 'test select',
        modelValue: '',
        rules: 'required',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const opts: any = wrapper.findAll('option');
    await opts?.at(0)?.trigger('change');

    await flushPromises();

    const error = wrapper.find('[data-testid="error-message"]');
    const select = wrapper.find('[data-testid="app-select"]');
    expect(error.exists()).toBe(true);
    expect(select.classes()).toContain('border-red-400');
  });

  test('Should add w-full class by default', async () => {
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select'
      }
    });

    const select = wrapper.find('[data-testid="app-select"]');

    expect(select.classes()).toContain('w-full');
  });

  test('Should not add w-full class if false prop', () => {
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        full: false
      }
    });

    const select = wrapper.find('[data-testid="app-select"]');

    expect(select.classes()).not.toContain('w-full');
  });

  test('Should not emit change event if no valid', async () => {
    const optsProps = [{ value: '', name: '0' }, ...options];
    const wrapper = mount(AppSelect, {
      props: {
        options: optsProps,
        name: 'test select',
        rules: 'required',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const opts: any = wrapper.findAll('option');
    await opts?.at(0)?.trigger('change');

    expect(wrapper.emitted('change')).toBeFalsy();
  });

  test('Should emit change event if valid', async () => {
    const optsProps = [{ value: '', name: '0' }, ...options];
    const wrapper = mount(AppSelect, {
      props: {
        options: optsProps,
        name: 'test select',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const opts: any = wrapper.findAll('option');
    await opts?.at(1)?.setSelected();
    await opts?.at(1)?.trigger('change');

    await flushPromises();

    expect(wrapper.emitted('change')).toBeTruthy();
  });

  test('Should have class text gray if no value', () => {
    const wrapper = mount(AppSelect, {
      props: {
        options,
        name: 'test select',
        modelValue: ''
      }
    });

    const select = wrapper.find('[data-testid="app-select"]');

    expect(select.classes()).toContain('text-gray-400');
  });
});
