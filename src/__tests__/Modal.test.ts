import { mount } from '@vue/test-utils';
import Modal from '../components/ui/Modal.vue';
import IconButton from '../components/ui/IconButton.vue';

describe('Modal tests', () => {
  test('should be closed by default', () => {
    const wrapper = mount(Modal);

    const overlay = wrapper.find('[data-testid="modal-overlay"]');
    const content = wrapper.find('[data-testid="modal-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);
  });

  test('should be opened if modelValue is true', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      }
    });

    const overlay = wrapper.find('[data-testid="modal-overlay"]');
    const content = wrapper.find('[data-testid="modal-content"]');

    expect(overlay.exists()).toBe(true);
    expect(content.exists()).toBe(true);
  });

  test('should apply size class to content', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      }
    });

    let content = wrapper.find('[data-testid="modal-content"]');

    expect(content.classes()).toContain('lg');

    await wrapper.setProps({ size: 'md' });

    content = wrapper.find('[data-testid="modal-content"]');

    expect(content.classes()).toContain('md');

    await wrapper.setProps({ size: 'sm' });

    content = wrapper.find('[data-testid="modal-content"]');

    expect(content.classes()).toContain('sm');
  });

  test('preventClose prop should work', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        preventClose: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
    let overlay = wrapper.find('[data-testid="modal-overlay"]');
    await overlay.trigger('click');

    overlay = wrapper.find('[data-testid="modal-overlay"]');
    const content = wrapper.find('[data-testid="modal-content"]');
    const closeButton = wrapper.findComponent(IconButton);

    expect(overlay.exists()).toBe(true);
    expect(content.exists()).toBe(true);
    expect(closeButton.exists()).toBe(false);

    expect(wrapper.props('modelValue')).toBe(true);
  });

  test('should close modal by click on overlay', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
    let overlay = wrapper.find('[data-testid="modal-overlay"]');
    const closeButton = wrapper.findComponent(IconButton);

    expect(closeButton.exists()).toBe(true);
    await overlay.trigger('click');

    overlay = wrapper.find('[data-testid="modal-overlay"]');
    const content = wrapper.find('[data-testid="modal-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);

    expect(wrapper.props('modelValue')).toBe(false);
  });

  test('should close modal by click on close btn', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
    const closeButton = wrapper.findComponent(IconButton);

    expect(closeButton.exists()).toBe(true);
    await closeButton.trigger('click');

    const overlay = wrapper.find('[data-testid="modal-overlay"]');
    const content = wrapper.find('[data-testid="modal-content"]');

    expect(overlay.exists()).toBe(false);
    expect(content.exists()).toBe(false);

    expect(wrapper.props('modelValue')).toBe(false);
  });
});
