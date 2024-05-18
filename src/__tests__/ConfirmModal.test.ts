import { mount } from '@vue/test-utils';
import ConfirmModal from '../components/ui/ConfirmModal.vue';
import AppButton from '../components/ui/AppButton.vue';

describe('ConfirmModal tests', () => {
  test('should opened and close correctly when modelValue changed', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        title: 'Test Modal',
        modelValue: false
      }
    });

    let modal = wrapper.find('[data-testid="confirm-modal"]');

    expect(modal.exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });

    modal = wrapper.find('[data-testid="confirm-modal"]');

    expect(modal.exists()).toBe(true);

    await wrapper.setProps({ modelValue: false });

    modal = wrapper.find('[data-testid="confirm-modal"]');

    expect(modal.exists()).toBe(false);
  });

  test('should apply title correctly', async () => {
    const title = 'Test Modal';
    const wrapper = mount(ConfirmModal, {
      props: {
        title,
        modelValue: true
      }
    });
    const titleNode = wrapper.find('h2');

    expect(titleNode.text()).toBe(title);
  });

  test('should disable btns by isLoading prop', async () => {
    const title = 'Test Modal';
    const wrapper = mount(ConfirmModal, {
      props: {
        title,
        modelValue: true,
        isLoading: true
      }
    });
    const btns = wrapper.findAllComponents(AppButton);

    btns.forEach((btn) => {
      expect(btn.props('disabled')).toBe(true);
    });

    await btns[0].trigger('click');

    const modal = wrapper.find('[data-testid="confirm-modal"]');

    expect(modal.exists()).toBe(true);

    await btns[1].trigger('click');

    expect(wrapper.emitted('confirm')).toBeFalsy();
  });

  test('should emit confirm event', async () => {
    const title = 'Test Modal';
    const wrapper = mount(ConfirmModal, {
      props: {
        title,
        modelValue: true
      }
    });
    const btns = wrapper.findAllComponents(AppButton);

    await btns[1].trigger('click');

    expect(wrapper.emitted('confirm')).toBeTruthy();
  });

  test('should close modal by cancel btn', async () => {
    const title = 'Test Modal';
    const wrapper = mount(ConfirmModal, {
      props: {
        title,
        modelValue: true,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
      }
    });
    const btns = wrapper.findAllComponents(AppButton);

    await btns[0].trigger('click');

    const modal = wrapper.find('[data-testid="confirm-modal"]');

    expect(modal.exists()).toBe(false);
    expect(wrapper.props('modelValue')).toBe(false);
  });
});
