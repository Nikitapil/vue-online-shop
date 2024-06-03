import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../modules/auth/authStore';
import { authMock } from './mocks/auth-mocks';
import { api } from '../api/apiInstance';
import * as lsHelpers from '../helpers/localStorage-helpers';
import { toast } from 'vue3-toastify';

describe('should call refresh method correctly', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should call authUnified method correctly', async () => {
    const store = useAuthStore();
    const spySetTokenToStorage = vi.spyOn(lsHelpers, 'setTokenToStorage').mockImplementation(() => {});
    api.refreshAuth = async () => authMock;

    store.refresh();

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(authMock.user);
    expect(spySetTokenToStorage).toHaveBeenCalledTimes(1);
    expect(spySetTokenToStorage).toHaveBeenCalledWith(authMock.accessToken);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should work default error handler', async () => {
    const store = useAuthStore();
    const spyConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    api.refreshAuth = async () => {
      throw new Error();
    };

    store.refresh();

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(spyConsoleError).toHaveBeenCalledTimes(1);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should work toast error handler', async () => {
    const store = useAuthStore();
    const spyErrorHandler = vi.spyOn(toast, 'error');
    api.register = async () => {
      throw new Error();
    };

    store.register({});

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(spyErrorHandler).toHaveBeenCalledTimes(1);
    expect(spyErrorHandler).toHaveBeenCalledWith('Error');
    expect(store.isAuthLoading).toBe(false);
  });

  test('should work register method correctly', async () => {
    const store = useAuthStore();
    const spySetTokenToStorage = vi.spyOn(lsHelpers, 'setTokenToStorage').mockImplementation(() => {});
    api.register = async () => authMock;

    store.register({});

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(authMock.user);
    expect(spySetTokenToStorage).toHaveBeenCalledTimes(1);
    expect(spySetTokenToStorage).toHaveBeenCalledWith(authMock.accessToken);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should work login method correctly', async () => {
    const store = useAuthStore();
    const spySetTokenToStorage = vi.spyOn(lsHelpers, 'setTokenToStorage').mockImplementation(() => {});
    api.login = async () => authMock;

    store.login({});

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(authMock.user);
    expect(spySetTokenToStorage).toHaveBeenCalledTimes(1);
    expect(spySetTokenToStorage).toHaveBeenCalledWith(authMock.accessToken);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should work logout method correctly', async () => {
    const store = useAuthStore();
    const spyRemoveTokenFromStorage = vi.spyOn(lsHelpers, 'removeTokenFromStorage').mockImplementation(() => {});
    api.logout = async () => {};

    store.logout();

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(null);
    expect(spyRemoveTokenFromStorage).toHaveBeenCalledTimes(1);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should catch error on logout method', async () => {
    const store = useAuthStore();
    const styToastifyMethod = vi.spyOn(toast, 'error').mockImplementation((message) => {
      return '123' + message;
    });

    api.logout = async () => {
      throw new Error();
    };

    store.logout();

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(styToastifyMethod).toHaveBeenCalledTimes(1);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should call updateUserData method correctly', async () => {
    const store = useAuthStore();
    const spySetTokenToStorage = vi.spyOn(lsHelpers, 'setTokenToStorage').mockImplementation(() => {});
    api.updateUserData = async () => authMock;

    store.updateUserData({});

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(authMock.user);
    expect(spySetTokenToStorage).toHaveBeenCalledTimes(1);
    expect(spySetTokenToStorage).toHaveBeenCalledWith(authMock.accessToken);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should call changePassword method correctly', async () => {
    const store = useAuthStore();
    const spySetTokenToStorage = vi.spyOn(lsHelpers, 'setTokenToStorage').mockImplementation(() => {});
    api.changePassword = async () => authMock;

    store.changePassword({});

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.user).toEqual(authMock.user);
    expect(spySetTokenToStorage).toHaveBeenCalledTimes(1);
    expect(spySetTokenToStorage).toHaveBeenCalledWith(authMock.accessToken);
    expect(store.isAuthLoading).toBe(false);
  });

  test('should correctly calc isAdmin flag', async () => {
    const store = useAuthStore();
    api.refreshAuth = async () => authMock;

    store.refresh();

    expect(store.isAuthLoading).toBe(true);

    await flushPromises();

    expect(store.isAdmin).toBe(false);
  });
});
