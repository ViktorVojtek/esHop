import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import nextCookie from 'next-cookies';
// import resolvers from './resolvers';
// import data from './state';
// import typeDefs from './typeDefs';

const domain = process.env.NODE_ENV === 'production' ? 'ckshop.codebrothers.sk' : 'localhost';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const port = 3012;
const uri = process.env.NODE_ENV === 'production' ? `${protocol}://${domain}/api` : `${protocol}://${domain}:${port}/api`;

const customFetch = (url, options, ctx) => {
  const token = (ctx && ctx.headers && ctx.headers.cookie)
    ? ctx.headers.cookie.split('token=')[1] : nextCookie(options).token;

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-access-token': token || '',
    },
  });
};

const client = (ctx) => (
  new ApolloClient({
    cache: new InMemoryCache(),
    credentials: 'include',
    uri,
    fetch: (url, options) => customFetch(url, options, ctx),
    // link,
    // resolvers,
    // typeDefs,
  })
);

// client.cache.writeData({ data });
// client.onResetStore(() => client.cache.writeData({ data }));

export default withApollo(
  client, { getDataFromTree: 'never' }, // 'always', 'never', 'ssr'
);
