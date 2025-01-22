import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalStorage from '@app/services/storage/LocalStorage';
import translationEn from './en/translation.json';
import translationRu from './ru/translation.json';

const langKey = LocalStorage.getLang();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: translationRu,
    },
  },
  lng: langKey as string,
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
