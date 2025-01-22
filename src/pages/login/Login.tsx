import { gql, useMutation } from '@apollo/client';
import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';
import { Error } from '@app/components';

const DEFAULT_PASSWORD = 'test@freshcells.de';
const DEFAULT_EMAIL = 'test@freshcells.de';

const LOGIN = gql`
  # Increments a back-end counter and gets its resulting value
  mutation IncrementCounter {
    currentValue
  }
`;

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleOnSubmit = (values: typeof form.values) => {
    const { email, password } = values;
    console.log('email', values.email);
    console.log('passowrd', values.password);
    login({ variables: { password, email } });
  };

  if (loading) return 'loading...';
  if (error) return 'error...';

  return (
    <ErrorBoundary fallback={<Error />}>
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
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
        <Button fullWidth mt="xl" size="md" type="submit">
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
