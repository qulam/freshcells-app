import { ApolloError } from '@apollo/client';
import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useNavigate } from 'react-router';
import { Error } from '@app/components';
import { LoginMutation, useLoginMutation } from '@app/services/graphql';
import LocalStorage from '@app/services/storage/LocalStorage';

const DEFAULT_EMAIL = 'test@freshcells.de';
const DEFAULT_PASSWORD = 'KTKwXm2grV4wHzW';
const EMAIL_REGEX = /^\S+@\S+$/;

type TypeException = {
  data: { data: { messages: { message: string }[] }[] };
};

const Login = () => {
  const navigate = useNavigate();
  const handleOnCompletedLogin = (data: LoginMutation) => {
    notifications.show({
      color: 'green',
      title: 'Success!',
      message: 'You have successfully logged in to Freshcells. 🌟',
    });

    LocalStorage.setAuthToken(data.login.jwt);
    navigate('/profile');
  };

  const handleOnErrorLogin = (error: ApolloError) => {
    const exception = error.graphQLErrors[0].extensions
      ?.exception as TypeException;
    const errorMessage = exception?.data.data[0].messages[0].message;

    notifications.show({
      color: 'red',
      title: error.graphQLErrors[0].message || 'Login Failed',
      message:
        errorMessage ||
        'An error occurred while attempting to log in. Please try again later.',
    });
  };

  const [login, { loading: isLoadingLogin }] = useLoginMutation({
    onCompleted: handleOnCompletedLogin,
    onError: handleOnErrorLogin,
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      identifier: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
    },

    validate: {
      identifier: (value) =>
        EMAIL_REGEX.test(value) ? null : 'Please use a valid email format',
      password: (value) =>
        value ? null : 'Password must consist of at least 6 characters',
    },
  });

  const handleOnSubmit = (values: typeof form.values) => {
    const { identifier, password } = values;
    login({ variables: { password, identifier } });
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key('identifier')}
          {...form.getInputProps('identifier')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          loading={isLoadingLogin}
        >
          Login
        </Button>
      </form>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Anchor component={Link} to="/authentication/register" fw={700}>
          Register
        </Anchor>
      </Text>
    </ErrorBoundary>
  );
};

export default Login;
