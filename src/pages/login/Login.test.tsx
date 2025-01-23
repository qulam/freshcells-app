import { notifications } from '@mantine/notifications';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '@app/services/graphql';
import LocalStorage from '@app/services/storage/LocalStorage.ts';
import Login from './Login';
import { renderWithProvider } from '../../../jest.setup';

describe('', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render component', () => {
    renderWithProvider(<Login />);
    const emailField = screen.getByLabelText('Email address');
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByLabelText('Password');
    expect(passwordField).toBeInTheDocument();

    const checkboxField = screen.getByLabelText('Keep me logged in');
    expect(checkboxField).toBeInTheDocument();

    expect(screen.getByText('Don&apos;t have an account?')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    expect(loginBtn).toBeInTheDocument();
  });

  it('should show client side validation errors', async () => {
    renderWithProvider(<Login />);
    const emailField = screen.getByLabelText('Email address');
    const passwordField = screen.getByLabelText('Password');

    // leave form fields without value
    fireEvent.change(emailField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '' } });

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginBtn);

    await waitFor(() =>
      expect(
        screen.getByText('Please use a valid email format')
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText('Password must consist of at least 6 characters')
      ).toBeInTheDocument()
    );

    // validate wrong email format
    fireEvent.change(emailField, { target: { value: 'wrong_email' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });

    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(
        screen.getByText('Please use a valid email format')
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText('Password must consist of at least 6 characters')
      ).not.toBeInTheDocument()
    );

    // fill correct values for the form fields
    fireEvent.change(emailField, { target: { value: 'john@doe' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });

    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(
        screen.queryByText('Please use a valid email format')
      ).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText('Password must consist of at least 6 characters')
      ).not.toBeInTheDocument()
    );
  });

  it('should show server side validation errors', async () => {
    const mockMutation = jest.fn();
    (useLoginMutation as jest.Mock).mockImplementation(({ onError }) => [
      (args: unknown) => {
        mockMutation(args);
        onError({});
      },
      { data: undefined, loading: false, error: undefined },
    ]);

    renderWithProvider(<Login />);
    const emailField = screen.getByLabelText('Email address');
    const passwordField = screen.getByLabelText('Password');

    // leave form fields without value
    fireEvent.change(emailField, { target: { value: 'john@doe' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginBtn);

    await waitFor(() =>
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          identifier: 'john@doe',
          password: '12345',
        },
      })
    );

    await waitFor(() =>
      expect(notifications.show).toHaveBeenCalledWith({
        color: 'red',
        title: 'Login Failed',
        message:
          'An error occurred while attempting to log in. Please try again later.',
      })
    );
  });

  it('should login successfully', async () => {
    const mockMutation = jest.fn();
    (useLoginMutation as jest.Mock).mockImplementation(({ onCompleted }) => [
      (args: unknown) => {
        mockMutation(args);
        onCompleted({ login: { jwt: 'token' } });
      },
      { data: undefined, loading: false, error: undefined },
    ]);

    renderWithProvider(<Login />);
    const emailField = screen.getByLabelText('Email address');
    const passwordField = screen.getByLabelText('Password');

    // leave form fields without value
    fireEvent.change(emailField, { target: { value: 'john@doe' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginBtn);

    await waitFor(() =>
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          identifier: 'john@doe',
          password: '12345',
        },
      })
    );

    await waitFor(() =>
      expect(notifications.show).toHaveBeenCalledWith({
        color: 'green',
        title: 'Success!',
        message: 'You have successfully logged in to Freshcells. \uD83C\uDF1F',
      })
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/profile'));

    await waitFor(() =>
      expect(LocalStorage.setAuthToken).toHaveBeenCalledWith('token')
    );
  });
});
