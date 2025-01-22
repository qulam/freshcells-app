import { Anchor, Box, Code, Flex, Group, Image, Title } from '@mantine/core';
import {
  IconLayoutDashboard,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { Link, NavLink, Outlet, useNavigate, Navigate } from 'react-router';
import LocalStorage from '@app/services/storage/LocalStorage';
import classes from './Dashboard.module.scss';

const data = [
  { link: '', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '/profile', label: 'Profile', icon: IconUser },
  { link: '/billing', label: 'Billing', icon: IconReceipt2 },
  { link: '/security', label: 'Security', icon: IconFingerprint },
  { link: '/ssh-keys', label: 'SSH Keys', icon: IconKey },
  {
    link: '/databases',
    label: 'Databases',
    icon: IconDatabaseImport,
  },
  {
    link: '/settings',
    label: 'Other Settings',
    icon: IconSettings,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const authToken = LocalStorage.getAuthToken();
  if (!authToken) return <Navigate to="/authentication/login" />;

  const logout = () => {
    LocalStorage.clear();
    navigate('/authentication/login');
  };

  return (
    <Flex className={classes.wrapper}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Link to="/">
              <Image
                className={classes.logo}
                src="https://www.freshcells.de/static/logo-freshcells-systems-engineering-635fbde7c635abdef0de4a086d164c74.svg"
              />
            </Link>
            <Code fw={700}>Fresh Cells</Code>
          </Group>
          {data.map((item) => (
            <NavLink
              className={({ isActive }) =>
                classNames(classes.link, { [classes.linkActive]: isActive })
              }
              to={item.link}
              key={item.label}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className={classes.footer}>
          <Anchor className={classes.link} onClick={logout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Anchor>
        </div>
      </nav>
      <Box p={60} w="100%">
        <Title mb={12}>Welcome To Freshcells 🚀</Title>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
