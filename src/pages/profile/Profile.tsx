import { Text } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from '@app/components';

const Profile = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Text>Profile</Text>
    </ErrorBoundary>
  );
};

export default Profile;
