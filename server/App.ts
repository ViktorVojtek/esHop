import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import nextjsApp from 'next';
import cors from 'cors';

import typeDefs from './app-data/graphql/typeDefs';
import resolvers from './app-data/graphql/resolvers';
import db from './app-data/db';

import {
  confirmationRoute,
  invoiceRoute,
  omegaRoute,
  orderRoute,
  paymentRoute,
  resendRoute,
  resetPasswordRoute,
  setupRoute,
  subscribeRoute,
} from './app-data/routes';
import path from 'path';

const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = nextjsApp({ dev });
const handle = nextApp.getRequestHandler();
const port: number = 3016;

const App: () => Promise<void> = async () => {
  try {
    await nextApp.prepare();

    const app: Express = express();

    app.use(
      helmet(),
      cors(),
      express.urlencoded({ extended: true, limit: '10mb' }),
      express.json({ limit: '10mb' })
    );

    const server = new ApolloServer({
      context: ({ req }) => ({ token: req.headers['x-access-token'] }),
      typeDefs,
      resolvers,
      introspection: true,
      playground: dev
        ? {
            endpoint: 'api',
            settings: {
              'editor.theme': 'light',
            },
          }
        : true,
    });

    server.applyMiddleware({ app, path: '/api' });
    await db();
    // await setup();

    app.use('/invoice-omega', omegaRoute);
    app.use('/subscribe', subscribeRoute);
    app.use('/payment', paymentRoute);
    app.use('/confirmation', confirmationRoute);
    app.use('/resend', resendRoute);
    app.use('/reset-password', resetPasswordRoute);
    app.use('/static/orders/*', orderRoute);

    app.use('/static/invoice/*', invoiceRoute);
    app.use('/auth/setup', setupRoute);
    app.all('*', (req, res) => handle(req, res));

    app.listen({ port });

    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default App;
