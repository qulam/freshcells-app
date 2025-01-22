import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Error.module.scss';

const refreshPage = () => {
  window.location.reload();
};

export const Error = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'error',
  });

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>{t('title')}</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {t('description')}
        </Text>
        <Group justify="center">
          <Button variant="white" size="md" onClick={refreshPage}>
            {t('refreshPage')}
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default Error;
