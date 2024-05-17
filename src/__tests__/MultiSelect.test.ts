import { mount } from '@vue/test-utils';
import MultiSelect from '../components/ui/MultiSelect/MultiSelect.vue';

describe('MultiSelect tests', () => {
  const options = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' }
  ];
  test('should open and close select options by click', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    await trigger.trigger('click');

    const updatedTrigger = wrapper.find('[data-testid="multi-select-trigger"]');

    const optionsBlock = wrapper.find('[data-testid="multi-select-options"]');

    expect(optionsBlock.exists()).toBe(true);
    expect(updatedTrigger.classes()).toContain('border-b');
    expect(updatedTrigger.classes()).toContain('border-b-black');

    await trigger.trigger('click');

    const updatedOptionsBlock = wrapper.find('[data-testid="multi-select-options"]');

    expect(updatedOptionsBlock.exists()).toBe(false);
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  test('should render correct amount of options', async () => {
    const wrapper = mount(MultiSelect, {
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

  test('should have selected count text if no placeholder', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options
      }
    });

    const trigger = wrapper.find('[data-testid="multi-select-trigger"]');

    expect(trigger.text()).toBe('Selected 0 options');
  });
});
