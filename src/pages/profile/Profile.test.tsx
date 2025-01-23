import { screen } from '@testing-library/react';
import { useUserQuery } from '@app/services/graphql';
import LocalStorage from '@app/services/storage/LocalStorage';

import Profile from './Profile';
import { renderWithProvider } from '../../../jest.setup';

describe('Profile Component', () => {
  beforeEach(() => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjE2OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw6c'
    );
  });

  it('should render component', async () => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      data: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      loading: false,
      error: null,
    }));

    renderWithProvider(<Profile />);

    expect(
      await screen.findByText('Your profile information')
    ).toBeInTheDocument();
    expect(await screen.findByText('First Name')).toBeInTheDocument();
    expect(await screen.findByText('Last Name')).toBeInTheDocument();

    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toHaveAttribute('value', 'John');
    expect(firstNameInput).toHaveAttribute('readOnly');

    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toHaveAttribute('value', 'Doe');
    expect(lastNameInput).toHaveAttribute('readOnly');
  });

  it('renders render loading', async () => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      loading: true,
      error: null,
    }));

    renderWithProvider(<Profile />);

    expect(screen.queryByLabelText('loading-overlay')).toBeInTheDocument();

    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toHaveAttribute('value', '---');
    expect(firstNameInput).toHaveAttribute('readOnly');

    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toHaveAttribute('value', '---');
    expect(lastNameInput).toHaveAttribute('readOnly');
  });

  it('renders be wrapped with error boundary', async () => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: new Error('Error'),
    }));

    renderWithProvider(<Profile />);

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByText('Something bad just happened...')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Refresh the page',
      })
    ).toBeInTheDocument();
  });

  it('should skip query in case loggedUserID is not existed', async () => {
    (LocalStorage.getAuthToken as jest.Mock).mockReturnValue(null);
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: false,
    }));

    renderWithProvider(<Profile />);

    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toHaveAttribute('value', '---');
    expect(firstNameInput).toHaveAttribute('readOnly');

    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toHaveAttribute('value', '---');
    expect(lastNameInput).toHaveAttribute('readOnly');
  });
});
