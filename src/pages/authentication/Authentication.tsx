import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { Error } from '@app/components';

const Authentication = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <h1>Authentication</h1>
      <Outlet />
    </ErrorBoundary>
  );
};

export default Authentication;
