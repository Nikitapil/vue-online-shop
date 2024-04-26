import { EAvailableTextLocales } from '@/domain/i18n.domain';

enum ELocalStorageKeys {
  TOKEN = 'token',
  LANG = 'lang',
  CURRENCY = 'currency'
}

// JWT tokens
export const setTokenToStorage = (token: string) => localStorage.setItem(ELocalStorageKeys.TOKEN, token);
export const getTokenFromStorage = () => localStorage.getItem(ELocalStorageKeys.TOKEN);
export const removeTokenFromStorage = () => localStorage.removeItem(ELocalStorageKeys.TOKEN);

// i18n
export const setLocaleToLocalStorage = (locale: EAvailableTextLocales) =>
  localStorage.setItem(ELocalStorageKeys.LANG, locale);
export const getLocaleFromLocalStorage = () => localStorage.getItem(ELocalStorageKeys.LANG);

// Currencies
export const setCurrencyToLocalStorage = (currency: string) =>
  localStorage.setItem(ELocalStorageKeys.CURRENCY, currency);
export const getCurrencyFromLocalStorage = () => localStorage.getItem(ELocalStorageKeys.CURRENCY);
