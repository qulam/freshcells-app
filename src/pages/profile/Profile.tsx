import { TextInput } from '@mantine/core';
import { PageWrapper } from '@app/components';
import { useUserQuery } from '@app/services/graphql';
import LocalStorage from '@app/services/storage/LocalStorage';
import { mayBeNull, parseJwtPayload } from '@app/utils/helpers.ts';

const authToken = LocalStorage.getAuthToken();

const Profile = () => {
  const loggedUserId = authToken && parseJwtPayload(authToken).id;
  const {
    loading: isLoadingGetUser,
    data: userInfo,
    error: userError,
  } = useUserQuery({
    skip: !loggedUserId,
    variables: {
      id: loggedUserId as string,
    },
  });

  return (
    <PageWrapper
      heading="Your profile information"
      isLoading={isLoadingGetUser}
      isError={!!userError}
    >
      <TextInput
        label="First Name"
        mb={12}
        readOnly
        value={mayBeNull(userInfo?.user?.firstName)}
      />
      <TextInput
        label="Last Name"
        readOnly
        value={mayBeNull(userInfo?.user?.lastName)}
      />
    </PageWrapper>
  );
};

export default Profile;
