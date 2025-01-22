import { Button, Container, Text, Title, Group } from '@mantine/core';
import { useNavigate } from 'react-router';
import classes from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const redirectToBack = () => {
    navigate(-1);
  };

  return (
    <Container className={classes.container} p={80}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={redirectToBack}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound;
