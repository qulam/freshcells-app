import { lazy } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@config/apollo';
import { theme } from '@config/theme';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@assets/css/index.scss';

const Dashboard = lazy(
  () => import(/* webpackChunkName: "Dashboard" */ '@pages/dashboard')
);
const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ '@pages/login')
);
const Profile = lazy(
  () => import(/* webpackChunkName: "Profile" */ '@pages/profile')
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ '@pages/not-found')
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
