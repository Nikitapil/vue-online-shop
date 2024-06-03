import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { EAuthModalTypes } from '../domain/components';
import AppHeader from '../modules/app/components/AppHeader.vue';
import HorizontalLoader from '../components/ui/loaders/HorizontalLoader.vue';
import AuthModal from '../modules/auth/components/AuthModal.vue';
import LogoutModal from '../modules/auth/components/LogoutModal.vue';

describe('AppHeader tests', () => {
  test('should not show nav if is not authenticated', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: false,
        isAuthLoading: false,
        isAdmin: false
      }
    });

    const nav = wrapper.find('nav');
    const authBlock = wrapper.find('[data-testid="auth-block"]');

    expect(nav.exists()).toBe(false);
    expect(authBlock.exists()).toBe(true);
  });

  test('should show nav if is authenticated', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: true,
        isAuthLoading: false,
        isAdmin: false
      }
    });

    const nav = wrapper.find('nav');

    expect(nav.exists()).toBe(true);
  });

  test('should not show loader if not isAuthLoading', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: true,
        isAuthLoading: false,
        isAdmin: false
      }
    });

    const loadingBlock = wrapper.find('[data-testid="auth-loading"]');
    const loader = wrapper.findComponent(HorizontalLoader);

    expect(loadingBlock.exists()).toBe(false);
    expect(loader.exists()).toBe(false);
  });

  test('should show loader if isAuthLoading', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: false,
        isAuthLoading: true,
        isAdmin: false
      }
    });

    const loadingBlock = wrapper.find('[data-testid="auth-loading"]');
    const loader = wrapper.findComponent(HorizontalLoader);

    expect(loadingBlock.exists()).toBe(true);
    expect(loader.exists()).toBe(true);
  });

  test('should not show admin link if isAdmin false', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: true,
        isAuthLoading: false,
        isAdmin: false
      }
    });

    const adminLink = wrapper.find('[data-testid="admin-link"]');

    expect(adminLink.exists()).toBe(false);
  });

  test('should show admin link if isAdmin true', () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: true,
        isAuthLoading: false,
        isAdmin: true
      }
    });

    const adminLink = wrapper.find('[data-testid="admin-link"]');

    expect(adminLink.exists()).toBe(true);
  });

  test('should open authModal with login prop', async () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: false,
        isAuthLoading: false,
        isAdmin: true
      }
    });

    const loginButton = wrapper.find('[data-testid="login-button"]');

    await loginButton.trigger('click');

    await flushPromises();

    const authModal = wrapper.findComponent(AuthModal);

    expect(authModal.props('modelValue')).toBe(true);
    expect(authModal.props('initialType')).toBe(EAuthModalTypes.LOGIN);
  });

  test('should open authModal with register prop', async () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: false,
        isAuthLoading: false,
        isAdmin: true
      }
    });

    const registerButton = wrapper.find('[data-testid="register-button"]');

    await registerButton.trigger('click');

    await flushPromises();

    const authModal = wrapper.findComponent(AuthModal);

    expect(authModal.props('modelValue')).toBe(true);
    expect(authModal.props('initialType')).toBe(EAuthModalTypes.REGISTER);
  });

  test('should open logout modal', async () => {
    const pinia = createTestingPinia();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [pinia]
      },
      props: {
        isAuthenticated: true,
        isAuthLoading: false,
        isAdmin: false
      }
    });

    const logoutButton = wrapper.find('[data-testid="logout-button"]');

    await logoutButton.trigger('click');

    await flushPromises();

    const logoutModal = wrapper.findComponent(LogoutModal);

    expect(logoutModal.props('modelValue')).toBe(true);
  });
});
