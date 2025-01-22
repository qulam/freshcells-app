import { lazy } from 'react';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router';
import { client } from '@app/config/apollo';
import { theme } from '@app/config/theme';
import '@app/assets/css/index.scss';

const Dashboard = lazy(
  () => import(/* webpackChunkName: "Dashboard" */ '@app/pages/dashboard')
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
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </MantineProvider>
  );
};

export default App;
