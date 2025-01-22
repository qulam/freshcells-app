import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { Error } from '@app/components';

const Dashboard = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <h1>Dashboard</h1>
      <Outlet />
    </ErrorBoundary>
  );
};

export default Dashboard;
