import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MultiSelect from '../components/ui/MultiSelect/MultiSelect.vue';
import { Icon } from '@iconify/vue';
import { DirectivePlugin } from '../directives/directive-plugin';
import { i18n } from "../plugins/i18n";

describe('MultiSelect tests', () => {
  const options = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' }
  ];
  test('should open and close select options by click', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const updatedTrigger = wrapper.find('[data-testid="multi-select-trigger"]');

    const optionsBlock = wrapper.find('[data-testid="multi-select-options"]');

    const icon = wrapper.findComponent(Icon);

    expect(optionsBlock.exists()).toBe(true);
    expect(updatedTrigger.classes()).toContain('border-b');
    expect(updatedTrigger.classes()).toContain('border-b-black');
    expect((icon.vm as any)._loadingIcon.name).toBe('simple-line-icons:arrow-up');

    await trigger.trigger('click');

    const updatedOptionsBlock = wrapper.find('[data-testid="multi-select-options"]');
    const updatedIcon = wrapper.findComponent(Icon);

    expect(updatedOptionsBlock.exists()).toBe(false);
    expect((updatedIcon.vm as any)._loadingIcon.name).toBe('simple-line-icons:arrow-down');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  test('should render correct amount of options', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const opts = wrapper.findAll('[data-testid="multi-select-option"]');

    expect(opts).toHaveLength(4);
  });

  test('should have a placeholder', async () => {
    const placeholder = 'test placeholder';
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        placeholder
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    expect(trigger.text()).toBe(placeholder);
  });

  test('should not have a label without provided prop', async () => {
    const placeholder = 'test placeholder';
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        placeholder
      }
    });

    const labelBlock = wrapper.find('[data-testid="multiselect-label"]');

    expect(labelBlock.exists()).toBe(false);
  });

  test('should have a label with provided prop', async () => {
    const placeholder = 'test placeholder';
    const label = 'label';
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        placeholder,
        label
      }
    });

    const labelBlock = wrapper.find('[data-testid="multiselect-label"]');

    expect(labelBlock.exists()).toBe(true);
    expect(labelBlock.text()).toBe(label);
  });

  test('should be disabled by prop', async () => {
    const placeholder = 'test placeholder';
    const label = 'label';
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        placeholder,
        label,
        disabled: true
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const optionsBlock = wrapper.find('[data-testid="multi-select-options"]');
    const updatedTrigger = wrapper.find('[data-testid="multi-select-trigger"]');

    expect(optionsBlock.exists()).toBe(false);
    expect(updatedTrigger.classes()).toContain('bg-slate-100');
    expect(updatedTrigger.classes()).toContain('cursor-not-allowed');
  });

  test('should have selected count text if no placeholder', () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    expect(trigger.text()).toBe('Selected 0 options');
  });

  test('expect option to be checked', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        modelValue: ['1']
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const checkedOptionCheckbox = wrapper.find<HTMLInputElement>('[data-testid="multi-select-option-checkbox"]');

    expect(checkedOptionCheckbox.element.checked).toBe(true);
  });

  test('should not select disabled option', async () => {
    const optionsWithDisabled = [{ value: '0', name: '0', disabled: true }, ...options];
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options: optionsWithDisabled,
        modelValue: [],
        'onUpdate:modelValue': (e: []) => wrapper.setProps({ modelValue: e })
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const option = wrapper.find('[data-testid="multi-select-option"]');

    await option.trigger('click');

    const checkedOptionCheckbox = wrapper.find<HTMLInputElement>('[data-testid="multi-select-option-checkbox"]');

    expect(checkedOptionCheckbox.element.checked).toBe(false);
    expect(wrapper.props('modelValue')).toEqual([]);
    expect(option.classes()).toContain('cursor-not-allowed');
    expect(option.classes()).toContain('hover:bg-slate-100');
    expect(option.classes()).toContain('bg-slate-100');
  });

  test('should select option', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        modelValue: [],
        'onUpdate:modelValue': (e: []) => wrapper.setProps({ modelValue: e })
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const option = wrapper.find('[data-testid="multi-select-option"]');

    await option.trigger('click');

    const checkedOptionCheckbox = wrapper.find<HTMLInputElement>('[data-testid="multi-select-option-checkbox"]');

    expect(checkedOptionCheckbox.element.checked).toBe(true);
    expect(wrapper.props('modelValue')).toEqual(['1']);
  });

  test('should unselect option', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        modelValue: ['1'],
        'onUpdate:modelValue': (e: []) => wrapper.setProps({ modelValue: e })
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const option = wrapper.find('[data-testid="multi-select-option"]');

    await option.trigger('click');

    const checkedOptionCheckbox = wrapper.find<HTMLInputElement>('[data-testid="multi-select-option-checkbox"]');

    expect(checkedOptionCheckbox.element.checked).toBe(false);
    expect(wrapper.props('modelValue')).toEqual([]);
  });

  test('should sort checked option', async () => {
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        modelValue: ['3'],
        'onUpdate:modelValue': (e: []) => wrapper.setProps({ modelValue: e })
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const option = wrapper.find('[data-testid="multi-select-option"]');

    expect(option.text()).toBe('3');
  });

  test('should be closed by click-outside', async () => {
    const spy = vi.spyOn(document.body, 'removeEventListener');
    const wrapper = mount(MultiSelect, {
      global: {
        plugins: [DirectivePlugin, i18n]
      },
      props: {
        options,
        label: 'test label'
      },
      attachTo: 'body'
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    let optionsBlock = wrapper.find('[data-testid="multi-select-options"]');

    expect(optionsBlock.exists()).toBe(true);

    const label = wrapper.find('[data-testid="multiselect-label"]');

    await label.trigger('click');

    optionsBlock = wrapper.find('[data-testid="multi-select-options"]');

    expect(optionsBlock.exists()).toBe(false);

    wrapper.unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
