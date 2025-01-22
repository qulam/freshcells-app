import { useMemo } from 'react';
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
import { Link, NavLink, Outlet } from 'react-router';
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
  const links = useMemo(
    () =>
      data.map((item) => (
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
      )),
    []
  );

  return (
    <Flex className={classes.wrapper}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Image
              className={classes.logo}
              src="https://www.freshcells.de/static/logo-freshcells-systems-engineering-635fbde7c635abdef0de4a086d164c74.svg"
            />
            <Code fw={700}>Fresh Cells</Code>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <Anchor
            component={Link}
            to="/authentication/login"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Anchor>
        </div>
      </nav>
      <Box p={60}>
        <Title mb={12}>Welcome To Freshcells 🚀</Title>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
