import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { EAuthModalTypes } from '../domain/components';

import AuthModal from '../modules/auth/components/AuthModal.vue';
import AuthForm from '../modules/auth/components/AuthForm.vue';

describe('AuthModal tests', () => {
  test('should not show AuthModal if modelValue is false', () => {
    const wrapper = mount(AuthModal, {
      props: {
        modelValue: false
      }
    });

    const authFrom = wrapper.findComponent(AuthForm);

    expect(authFrom.exists()).toBe(false);
  });

  test('should show correct AuthForm for login', () => {
    const wrapper = mount(AuthModal, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        modelValue: true,
        initialType: EAuthModalTypes.LOGIN
      }
    });

    const authFrom = wrapper.findComponent(AuthForm);

    expect(authFrom.props('initialType')).toBe(EAuthModalTypes.LOGIN);
  });

  test('should show correct AuthForm for register', () => {
    const wrapper = mount(AuthModal, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        modelValue: true,
        initialType: EAuthModalTypes.REGISTER
      }
    });

    const authFrom = wrapper.findComponent(AuthForm);

    expect(authFrom.props('initialType')).toBe(EAuthModalTypes.REGISTER);
  });
});
