import { Text } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from '@app/components';

const Dashboard = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Text>Dashboard</Text>
    </ErrorBoundary>
  );
};

export default Dashboard;
