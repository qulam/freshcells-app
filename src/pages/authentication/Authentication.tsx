import { Paper, Title } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router';
import { Error } from '@app/components';
import LocalStorage from '@app/services/storage/LocalStorage';
import classes from './Authentication.module.scss';

const Authentication = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth',
  });

  const authToken = LocalStorage.getAuthToken();
  if (authToken) return <Navigate to="/profile" />;

  return (
    <ErrorBoundary fallback={<Error />}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            {t('title')}
          </Title>

          <Outlet />
        </Paper>
      </div>
    </ErrorBoundary>
  );
};

export default Authentication;
