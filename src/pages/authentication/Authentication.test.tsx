import { screen } from '@testing-library/react';
import { Navigate } from 'react-router';
import LocalStorage from '@app/services/storage/LocalStorage';
import Authentication from './Authentication';
import { renderWithProvider } from '../../../jest.setup';

describe('Authentication Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to /profile when authToken exists, and not render the form', async () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue('mockAuthToken');

    renderWithProvider(<Authentication />);

    expect(screen.queryByText('Mock Outlet')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Navigate')).toBeInTheDocument();
    expect(Navigate).toHaveBeenCalledWith({ to: '/profile' }, undefined);
  });

  it('should render the Authentication form with the correct structure when no authToken exists', () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue(null);

    renderWithProvider(<Authentication />);

    expect(screen.getByText(/Welcome to Freshcells/i)).toBeInTheDocument();
    expect(screen.queryByText('Mock Navigate')).not.toBeInTheDocument();
    expect(screen.getByText('Mock Outlet')).toBeInTheDocument();

    // Ensure Navigate was not called
    expect(Navigate).not.toHaveBeenCalled();
  });
});
