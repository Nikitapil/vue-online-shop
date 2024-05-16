import { flushPromises, mount } from '@vue/test-utils';
import ContentSwitcher from '../components/ui/ContentSwitcher/ContentSwitcher.vue';
import ContentSwitcherButton from '../components/ui/ContentSwitcher/ContentSwitcherButton.vue';
import AppButton from '../components/ui/AppButton.vue';

describe('ContentSwitcher tests', () => {
  const options = [
    { value: '1', name: '1' },
    { value: '2', name: '2' }
  ];

  test('should render correct number of buttons', () => {
    const wrapper = mount(ContentSwitcher, {
      props: {
        options,
        modelValue: ''
      }
    });

    const buttons = wrapper.findAllComponents(ContentSwitcherButton);

    expect(buttons.length).toBe(2);
  });

  test('should not emit update:modelValue if value not changed', async () => {
    const wrapper = mount(ContentSwitcher, {
      props: {
        options,
        modelValue: '1',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const button = wrapper.findComponent(ContentSwitcherButton);

    await button.trigger('click');
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  test('should emit update:modelValue if value changed', async () => {
    const wrapper = mount(ContentSwitcher, {
      props: {
        options,
        modelValue: '2',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const button = wrapper.findComponent(ContentSwitcherButton);

    await button.trigger('click');
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.props('modelValue')).toBe('1');
  });

  test('should change button appearance', async () => {
    const wrapper = mount(ContentSwitcher, {
      props: {
        options,
        modelValue: '2',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    });

    const button = wrapper.findComponent(AppButton);

    expect(button.props('appearance')).toBe('transparent');

    await button.trigger('click');
    await flushPromises();

    const updatedButton = wrapper.findComponent(AppButton);

    expect(updatedButton.props('appearance')).toBe('secondary');
  });
});
