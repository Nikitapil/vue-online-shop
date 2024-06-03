import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { flushPromises, mount } from '@vue/test-utils';
import { i18n } from '../plugins/i18n';
import AuthForm from '../modules/auth/components/AuthForm.vue';
import { EAuthModalTypes } from '../domain/components';
import { useAuthStore } from '../modules/auth/authStore';
import { userMocks } from './mocks/user-mocks';

describe('AuthForm tests', () => {
  const pinia = createTestingPinia();

  test('should validate passwords correctly', async () => {
    const wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia]
      },
      props: {
        initialType: EAuthModalTypes.REGISTER
      }
    });

    const passwordInput = wrapper.find('input[name="password"]');
    const repeatPasswordInput = wrapper.find('input[name="password-repeat"]');
    const form = wrapper.find('form');

    await passwordInput.setValue('123456789');
    await repeatPasswordInput.setValue('qwerty');

    await form.trigger('submit');

    await flushPromises();

    const errors = wrapper.findAll('[data-testid="error-message"]')?.map((err) => err.text());

    expect(errors).toContain(i18n.global.t('passwords_should_be_equal'));
    expect(wrapper.emitted('success')).toBeFalsy();
  });

  test('should call register function correctly', async () => {
    const store = useAuthStore(pinia);
    const registerSpy = vi.spyOn(store, 'register');
    const wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia]
      },
      props: {
        initialType: EAuthModalTypes.REGISTER
      }
    });

    const passwordInput = wrapper.find('input[name="password"]');
    const repeatPasswordInput = wrapper.find('input[name="password-repeat"]');
    const emailInput = wrapper.find('input[name="email"]');
    const nameInput = wrapper.find('input[name="name"]');
    const form = wrapper.find('form');

    await passwordInput.setValue('123456789');
    await repeatPasswordInput.setValue('123456789');
    await emailInput.setValue('test@test.com');
    await nameInput.setValue('test name');

    await form.trigger('submit');

    await flushPromises();

    expect(registerSpy).toHaveBeenCalledTimes(1);
  });

  test('should call login function correctly', async () => {
    const store = useAuthStore(pinia);
    const loginSpy = vi.spyOn(store, 'login');
    const wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia]
      },
      props: {
        initialType: EAuthModalTypes.LOGIN
      }
    });

    const passwordInput = wrapper.find('input[name="password"]');
    const emailInput = wrapper.find('input[name="email"]');
    const form = wrapper.find('form');

    await passwordInput.setValue('123456789');
    await emailInput.setValue('test@test.com');

    await form.trigger('submit');

    await flushPromises();

    expect(loginSpy).toHaveBeenCalledTimes(1);
  });

  test('should emit success event', async () => {
    const store = useAuthStore(pinia);
    const wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia]
      },
      props: {
        initialType: EAuthModalTypes.LOGIN
      }
    });

    const passwordInput = wrapper.find('input[name="password"]');
    const emailInput = wrapper.find('input[name="email"]');
    const form = wrapper.find('form');

    await passwordInput.setValue('123456789');
    await emailInput.setValue('test@test.com');

    await form.trigger('submit');

    store.user = userMocks;

    await flushPromises();

    expect(wrapper.emitted('success')).toBeTruthy();
  });

  test('should swap from correctly', async () => {
    const wrapper = mount(AuthForm, {
      global: {
        plugins: [pinia]
      },
      props: {
        initialType: EAuthModalTypes.LOGIN
      }
    });

    let repeatedInput = wrapper.find('input[name="password-repeat"]');

    expect(repeatedInput.exists()).toBe(false);

    const swapButton = wrapper.find('[data-testid="swap-button"]');

    await swapButton.trigger('click');

    await flushPromises();

    repeatedInput = wrapper.find('input[name="password-repeat"]');

    expect(repeatedInput.exists()).toBe(true);

    await swapButton.trigger('click');

    await flushPromises();

    repeatedInput = wrapper.find('input[name="password-repeat"]');

    expect(repeatedInput.exists()).toBe(false);
  });
});
