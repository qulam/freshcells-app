import { screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router';
import LocalStorage from '@app/services/storage/LocalStorage';
import Dashboard from './Dashboard';
import { renderWithProvider } from '../../../jest.setup';

describe('Dashboard Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should redirect to /authentication/login if no authToken exists', () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue(null);

    renderWithProvider(<Dashboard />);

    expect(Navigate).toHaveBeenCalledWith(
      { to: '/authentication/login' },
      undefined
    );
  });

  it('should render the Dashboard with menu and footer links if authToken exists', () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue('mockAuthToken');
    (LocalStorage.getLang as jest.Mock).mockReturnValue('en');

    renderWithProvider(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('SSH Keys')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('Other Settings')).toBeInTheDocument();
    expect(screen.getByText('Russian')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should log out and navigate to /authentication/login when logout link is clicked', () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue('mockAuthToken');
    renderWithProvider(<Dashboard />);

    const logoutLink = screen.getByText('Logout');
    fireEvent.click(logoutLink);

    expect(LocalStorage.clear).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/authentication/login');
  });

  it('should change language when the language link is clicked', () => {
    const mockChangeLanguage = jest.fn();
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue('mockAuthToken');
    (LocalStorage.getLang as jest.Mock).mockReturnValue('en');
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage: mockChangeLanguage,
      },
    });

    renderWithProvider(<Dashboard />);

    const languageLink = screen.getByText('ru');
    fireEvent.click(languageLink);

    expect(LocalStorage.setLang).toHaveBeenCalledWith('ru');
    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
    expect(screen.getByText('en')).toBeInTheDocument();
  });
});
