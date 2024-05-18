import { mount } from '@vue/test-utils';
import Drawer from '../components/ui/Drawer.vue';
import IconButton from '../components/ui/IconButton.vue';

describe('Drawer tests', () => {
  test('Should be close if modelValue is false', () => {
    const wrapper = mount(Drawer, {
      props: {
        title: 'Darwer test',
        modelValue: false
      }
    });

    const overlay = wrapper.find('[data-testid="drawer-overlay"]');
    const content = wrapper.find('[data-testid="drawer-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);
  });

  test('Should be opened if modelValue is false', () => {
    const wrapper = mount(Drawer, {
      props: {
        title: 'Darwer test',
        modelValue: true
      }
    });

    const overlay = wrapper.find('[data-testid="drawer-overlay"]');
    const content = wrapper.find('[data-testid="drawer-content"]');

    expect(overlay.exists()).toBe(true);
    expect(content.exists()).toBe(true);
  });

  test('Should be correctly applied title', () => {
    const title = 'Darwer test';
    const wrapper = mount(Drawer, {
      props: {
        title,
        modelValue: true
      }
    });

    const titleNode = wrapper.find('[data-testid="drawer-title"]');

    expect(titleNode.text()).toBe(title);
  });

  test('Should close by click on overlay', async () => {
    const title = 'Darwer test';
    const wrapper = mount(Drawer, {
      props: {
        title,
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    let overlay = wrapper.find('[data-testid="drawer-overlay"]');

    await overlay.trigger('click');

    overlay = wrapper.find('[data-testid="drawer-overlay"]');
    const content = wrapper.find('[data-testid="drawer-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);
    expect(wrapper.props('modelValue')).toBe(false);
  });

  test('Should close by click on arrow', async () => {
    const title = 'Darwer test';
    const wrapper = mount(Drawer, {
      props: {
        title,
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });

    const arrowBtn = wrapper.findComponent(IconButton);

    await arrowBtn.trigger('click');

    const overlay = wrapper.find('[data-testid="drawer-overlay"]');
    const content = wrapper.find('[data-testid="drawer-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);
    expect(wrapper.props('modelValue')).toBe(false);
  });
});
