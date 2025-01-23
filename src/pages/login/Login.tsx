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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth',
  });
  const navigate = useNavigate();
  const handleOnCompletedLogin = (data: LoginMutation) => {
    notifications.show({
      color: 'green',
      title: t('loginSuccessTitle'),
      message: t('loginSuccessMessage'),
    });

    LocalStorage.setAuthToken(data.login.jwt);
    navigate('/profile');
  };

  const handleOnErrorLogin = (error: ApolloError) => {
    const graphQLError = error?.graphQLErrors?.[0];
    const exception = graphQLError?.extensions?.exception as TypeException;
    const errorMessage = exception?.data?.data?.[0]?.messages?.[0]?.message;

    notifications.show({
      color: 'red',
      title: graphQLError?.message || t('loginErrorTitle'),
      message: errorMessage || t('loginErrorMessage'),
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
        EMAIL_REGEX.test(value) ? null : t('emailFormatError'),
      password: (value) => (value ? null : t('passwordFormatError')),
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
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          size="md"
          key={form.key('identifier')}
          {...form.getInputProps('identifier')}
        />
        <PasswordInput
          label={t('passwordLabel')}
          placeholder={t('passwordPlaceholder')}
          mt="md"
          size="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Checkbox label={t('keepMeLoggedIn')} mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          loading={isLoadingLogin}
        >
          {t('loginBtnText')}
        </Button>
      </form>

      <Text ta="center" mt="md" component="div">
        {t('dontYouHaveAnAccount')}?{' '}
        <Anchor component={Link} to="/authentication/register" fw={700}>
          {t('register')}
        </Anchor>
      </Text>
    </ErrorBoundary>
  );
};

export default Login;
