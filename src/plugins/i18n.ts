import { createI18n } from 'vue-i18n';

import { EAvailableTextLocales } from '@/domain/i18n.domain';

import { getLocaleFromLocalStorage } from '@/helpers/localStorage-helpers';

import messages from '../locales/index';

export const i18n = createI18n({
  availableLocales: [EAvailableTextLocales.ENG, EAvailableTextLocales.RUS],
  locale: getLocaleFromLocalStorage() || EAvailableTextLocales.ENG,
  fallbackLocale: EAvailableTextLocales.ENG,
  legacy: false,
  messages
});
