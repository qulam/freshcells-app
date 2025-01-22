import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';
import { Error } from '@app/components';

const Login = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
        defaultValue="test@freshcells.de"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        defaultValue="KTKwXm2grV4wHzW"
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md">
        Login
      </Button>

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
