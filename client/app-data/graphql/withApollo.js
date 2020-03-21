import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import nextCookie from 'next-cookies';
// import resolvers from './resolvers';
// import data from './state';
// import typeDefs from './typeDefs';

const domain = process.env.NODE_ENV === 'production' ? '' : 'localhost';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const port = 3012;

const customFetch = (uri, ctx) => {
  const { token } = nextCookie(ctx);

  return fetch(uri, {
    ...ctx,
    headers: {
      ...ctx.headers,
      'x-access-token': token || '',
    },
  });
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NODE_ENV === 'production' ? `${protocol}://${domain}/api` : `${protocol}://${domain}:${port}/api`,
  fetch: customFetch,
  // resolvers,
  // typeDefs,
});

// client.cache.writeData({ data });
// client.onResetStore(() => client.cache.writeData({ data }));

export default withApollo(
  () => client, { getDataFromTree: 'never' }, // 'always', 'never', 'ssr'
);
