import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import nextCookie from 'next-cookies';
// import resolvers from './resolvers';
// import data from './state';
// import typeDefs from './typeDefs';

const domain: string =
  process.env.NODE_ENV === 'production' ? 'eshop.kupelecks.sk' : 'localhost';
const protocol: string =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
const port: number = 3016;
const uri: string =
  process.env.NODE_ENV === 'production'
    ? `${protocol}://${domain}/api`
    : `${protocol}://${domain}:${port}/api`;

const customFetch: (url: any, options: any, ctx: any) => Promise<Response> = (
  url,
  options,
  ctx
) => {
  const token: string =
    ctx && ctx.headers && ctx.headers.cookie
      ? ctx.headers.cookie.split('token=')[1]
      : nextCookie(options).token;

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-access-token': token || '',
    },
  });
};

const client = (ctx) =>
  new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: 'include',
    uri,
    fetch: (url, options) => customFetch(url, options, ctx),
    // link,
    // resolvers,
    // typeDefs,
  });

// client.cache.writeData({ data });
// client.onResetStore(() => client.cache.writeData({ data }));

export default withApollo(
  client,
  { getDataFromTree: 'never' } // 'always', 'never', 'ssr'
);
