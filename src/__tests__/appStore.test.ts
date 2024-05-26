import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import * as lsHelpers from '../helpers/localStorage-helpers';

import { useAppStore } from '../modules/app/appStore';

import { mockFinanceSettings } from './mocks/finance-settings';
import { api } from '../api/apiInstance';

describe('AppStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should work correctly setCurrentCurrency', async () => {
    const setCurrencyToLocalStorageSpy = vi.spyOn(lsHelpers, 'setCurrencyToLocalStorage').mockImplementation(() => {});
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    store.financeSettings = mockFinanceSettings;
    store.setCurrentCurrency('RUB');

    expect(setCurrencyToLocalStorageSpy).toHaveBeenCalledTimes(1);
    expect(store.currentCurrency).toBe('RUB');
    expect(store.currentCurrencyExchangeRate).toBe(89.670486);
  });

  test('should work correctly getFinanceSettings', async () => {
    api.getFinanceSettings = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.getFinanceSettings();

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should work setDeliveryCost', async () => {
    api.setTaxValue = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.setTax(123);

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should work setDeliveryCost', async () => {
    api.setDeliveryCost = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.setDeliveryCost(123);

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should work setOrderPriceWithFreeDeliveryCost', async () => {
    api.setOrderPriceWithFreeDeliveryCost = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.setOrderPriceWithFreeDeliveryCost(123);

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should work setAvailableCurrencies', async () => {
    api.setAvailableCurrencies = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.setAvailableCurrencies(['USD', 'RUS', 'EUR']);

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should work updateExchangeRates', async () => {
    api.updateExchangeRates = async () => mockFinanceSettings;
    const store = useAppStore();
    expect(store.financeSettings).toEqual(null);

    await store.updateExchangeRates();

    expect(store.financeSettings).toEqual(mockFinanceSettings);
  });

  test('should set correct default currency', async () => {
    api.setAvailableCurrencies = async () => mockFinanceSettings;
    const store = useAppStore();
    store.setCurrentCurrency('EUR');
    expect(store.financeSettings).toEqual(null);

    await store.setAvailableCurrencies(['USD', 'RUS']);

    expect(store.currentCurrency).toBe(store.baseCurrency);
  });
});
