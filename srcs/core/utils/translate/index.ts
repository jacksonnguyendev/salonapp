import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import vi from './locales/vi';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;

I18n.translations = {
  en,
  vi,
};

export const translate = (keyString: string, params?: Object): string => {
  return I18n.t(keyString, params);
};

export const changeLanguage = (languageTag: string): void => {
  I18n.locale = languageTag;
};
