import { TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@app/components';
import { useUserQuery } from '@app/services/graphql';
import LocalStorage from '@app/services/storage/LocalStorage';
import { mayBeNull, parseJwtPayload } from '@app/utils/helpers';

const authToken = LocalStorage.getAuthToken();

const Profile = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile',
  });
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
      heading={t('heading')}
      isLoading={isLoadingGetUser}
      isError={!!userError}
    >
      <TextInput
        label={t('firstName')}
        mb={12}
        readOnly
        value={mayBeNull(userInfo?.user?.firstName)}
      />
      <TextInput
        label={t('lastName')}
        readOnly
        value={mayBeNull(userInfo?.user?.lastName)}
      />
    </PageWrapper>
  );
};

export default Profile;
