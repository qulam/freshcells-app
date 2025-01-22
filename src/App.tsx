import { lazy, Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router';
import { client } from '@app/config/apollo/apollo';
import { theme } from '@app/config/theme';
import '@app/config/i18/config.ts';

import '@app/assets/css/index.scss';

const Dashboard = lazy(
  () => import(/* webpackChunkName: "Dashboard" */ '@app/pages/dashboard')
);

const Authentication = lazy(
  () =>
    import(/* webpackChunkName: "Authentication" */ '@app/pages/authentication')
);

const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ '@app/pages/login')
);

const Profile = lazy(
  () => import(/* webpackChunkName: "Profile" */ '@app/pages/profile')
);

const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ '@app/pages/not-found')
);

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ApolloProvider client={client}>
        <Suspense fallback={<LoadingOverlay visible zIndex={1000} />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                {/* add new protected pages - users, reports, settings and etc... */}
              </Route>

              <Route path="authentication" element={<Authentication />}>
                <Route path="login" element={<Login />} />
                {/* add new auth pages - register, forgot password and etc... */}
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </MantineProvider>
  );
};

export default App;
