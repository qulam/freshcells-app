import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router';
import i18n from '@app/config/i18/config';
import translationEn from '@app/config/i18/en/translation.json';
import LocalStorage from '@app/services/storage/LocalStorage.ts';

jest.mock('react-router', () => ({
  Navigate: jest.fn(() => <div>Mock Navigate</div>),
  Outlet: jest.fn(() => <div>Mock Outlet</div>),
  BrowserRouter: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@app/services/storage/LocalStorage');
LocalStorage.getAuthToken = jest.fn();
LocalStorage.getLang = jest.fn();
LocalStorage.getItem = jest.fn();

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
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{ui}</BrowserRouter>{' '}
      </I18nextProvider>
    </MantineProvider>
  );
