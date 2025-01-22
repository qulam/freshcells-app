import { Paper, Title } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { Error } from '@app/components';
import classes from './Authentication.module.scss';

const Authentication = () => {
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
            Welcome back to Fresh Cells!
          </Title>

          <Outlet />
        </Paper>
      </div>
    </ErrorBoundary>
  );
};

export default Authentication;
