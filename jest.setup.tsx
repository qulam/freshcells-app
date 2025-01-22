import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from '@app/config/i18/config';
import translationEn from '@app/config/i18/en/translation.json';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

jest.mock('@app/services/storage/LocalStorage', () => ({
  getLang: jest.fn().mockReturnValue('en'),
}));

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: {},
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const renderWithProvider = (ui: ReactNode) =>
  render(
    <MantineProvider>
      <I18nextProvider i18n={i18n}> {ui} </I18nextProvider>
    </MantineProvider>
  );
