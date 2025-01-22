import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LocalStorage from '@app/services/storage/LocalStorage';

const httpLink = createHttpLink({
  uri: import.meta.env.PUBLIC_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = LocalStorage.getAuthToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
