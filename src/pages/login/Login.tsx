import { Text } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from '@app/components';

const Login = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Text>Login</Text>
    </ErrorBoundary>
  );
};

export default Login;
