import { mount } from '@vue/test-utils';
import AppButton from '../components/ui/AppButton.vue';

describe('AppButton', () => {
  test('should apply correct tests', async () => {
    const wrapper = mount(AppButton);

    const btnTransparent = wrapper.find('button');

    expect(btnTransparent.classes()).toContain('transparent');

    await wrapper.setProps({ appearance: 'primary' });

    const btnPrimary = wrapper.find('button');

    expect(btnPrimary.classes()).toContain('primary');

    await wrapper.setProps({ appearance: 'secondary' });

    const btnSecondary = wrapper.find('button');

    expect(btnSecondary.classes()).toContain('secondary');

    await wrapper.setProps({ appearance: 'success' });

    const btnSuccess = wrapper.find('button');

    expect(btnSuccess.classes()).toContain('success');

    await wrapper.setProps({ appearance: 'danger' });

    const btnDanger = wrapper.find('button');

    expect(btnDanger.classes()).toContain('danger');
  });
});
