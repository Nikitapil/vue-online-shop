import { mount } from '@vue/test-utils';
import DropdownSwitcher from '../components/ui/DropdownSwitcher.vue';
import IconButton from '../components/ui/IconButton.vue';
import { DirectivePlugin } from '../directives/directive-plugin';

describe('DropdownSwitcher test', () => {
  const options = ['1', '2', '3'];

  test('should not be opened if open props is false', () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: false,
        icon: 'la:money-bill-wave'
      }
    });

    const optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(false);
  });

  test('should be opened if open props is true', () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave'
      }
    });

    const optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(true);
  });

  test('should be opened if open props is true', () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave'
      }
    });

    const optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(true);
  });

  test('should render correct value', () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave',
        modelValue: '1'
      }
    });

    const value = wrapper.find('[data-testid="dropdown-switcher-value"]');

    expect(value.text()).toBe('1');
  });

  test('should render correct amount of options', () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave',
        modelValue: '1'
      }
    });

    const optionsNodes = wrapper.findAll('[data-testid="dropdown-switcher-option"]');

    expect(optionsNodes.length).toBe(options.length);
  });

  test('should change value correctly and emit select-option event', async () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave',
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const optionsNodes = wrapper.findAll('[data-testid="dropdown-switcher-option"]');

    await optionsNodes[1].trigger('click');

    const valueNode = wrapper.find('[data-testid="dropdown-switcher-value"]');

    expect(wrapper.emitted('select-option')).toBeTruthy();
    expect(wrapper.props('modelValue')).toBe('2');
    expect(valueNode.text()).toBe('2');
  });

  test('should be opened and closed by IconClick', async () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave',
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    let optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(true);

    const iconBbtn = wrapper.findComponent(IconButton);

    await iconBbtn.trigger('click');

    optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(false);

    await iconBbtn.trigger('click');

    optionsContainer = wrapper.find('[data-testid="dropdown-options-container"]');

    expect(optionsContainer.exists()).toBe(true);
  });

  test('should be opened and closed by IconClick', async () => {
    const wrapper = mount(DropdownSwitcher, {
      global: {
        plugins: [DirectivePlugin]
      },
      props: {
        options,
        open: true,
        icon: 'la:money-bill-wave',
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const actualOption = wrapper.find('[data-testid="dropdown-switcher-option"]');

    expect(actualOption.classes()).toContain('bg-slate-500');
    expect(actualOption.classes()).toContain('text-white');
  });
});
