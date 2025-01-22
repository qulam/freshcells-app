import { Button, Container, Text, Title, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classes from './NotFound.module.scss';

const NotFound = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'notFound',
  });
  const navigate = useNavigate();
  const redirectToBack = () => {
    navigate(-1);
  };

  return (
    <Container className={classes.container} p={80}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t('title')}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {t('description')}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={redirectToBack}>
          {t('goBack')}
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound;
