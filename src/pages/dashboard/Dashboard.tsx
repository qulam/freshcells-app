import { useState } from 'react';
import { Anchor, Box, Code, Flex, Group, Image, Title } from '@mantine/core';
import {
  IconLayoutDashboard,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconLanguage,
  IconReceipt2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet, useNavigate, Navigate } from 'react-router';
import { Languages } from '@app/models/language';
import LocalStorage from '@app/services/storage/LocalStorage';
import classes from './Dashboard.module.scss';

const menuList = [
  { link: '', label: 'dashboard', icon: IconLayoutDashboard },
  { link: '/profile', label: 'profile', icon: IconUser },
  { link: '/billing', label: 'billing', icon: IconReceipt2 },
  { link: '/security', label: 'security', icon: IconFingerprint },
  { link: '/ssh-keys', label: 'sshKeys', icon: IconKey },
  {
    link: '/databases',
    label: 'databases',
    icon: IconDatabaseImport,
  },
  {
    link: '/settings',
    label: 'otherSettings',
    icon: IconSettings,
  },
];

const Dashboard = () => {
  const langKey = LocalStorage.getLang() || 'en';
  const [lang, setLang] = useState<Languages>(langKey);
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'dashboard',
  });

  const inActiveLang = lang === 'en' ? 'ru' : 'en';
  const changeLanguage = () => {
    setLang(inActiveLang);

    LocalStorage.setLang(inActiveLang);
    i18n.changeLanguage(inActiveLang);
  };

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
          {menuList.map((menu) => (
            <NavLink
              className={({ isActive }) =>
                classNames(classes.link, { [classes.linkActive]: isActive })
              }
              to={menu.link}
              key={menu.label}
            >
              <menu.icon className={classes.linkIcon} stroke={1.5} />
              <span>{t(menu.label)}</span>
            </NavLink>
          ))}
        </div>

        <div className={classes.footer}>
          <Anchor className={classes.link} onClick={changeLanguage}>
            <IconLanguage className={classes.linkIcon} stroke={1.5} />
            <span>{t(inActiveLang)}</span>
          </Anchor>
          <Anchor className={classes.link} onClick={logout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>{t('logout')}</span>
          </Anchor>
        </div>
      </nav>
      <Box p={60} w="100%">
        <Title mb={12}>{t('title')}</Title>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
