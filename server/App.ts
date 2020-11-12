import express, { Express, NextFunction, Request, Response } from 'express';
// import * as createLocaleMiddleware from 'express-locale';
import { ApolloServer } from 'apollo-server-express';
// import bodyParser from 'body-parser';
import helmet from 'helmet';
import nextjsApp from 'next';
import cors from 'cors';

import typeDefs from './app-data/graphql/typeDefs';
import resolvers from './app-data/graphql/resolvers';
import db from './app-data/db';

import paymentRoute from './app-data/routes/payment';
import subscribeRoute from './app-data/routes/subscribe';
import omegaRoute from './app-data/routes/invoice-omega';
import confirmationRoute from './app-data/routes/confirmation';
import resendRoute from './app-data/routes/resend';
import resetPassword from './app-data/routes/reset-password';
import orders from './app-data/routes/orders';
import invoices from './app-data/routes/invoices';
import sucessPayment from './app-data/routes/sucess-payment';
import unsucessPayment from './app-data/routes/unsucess-payment';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = nextjsApp({ dev });
const handle = nextApp.getRequestHandler();
const port = 3016;

const App: () => Promise<void> = async () => {
  try {
    await nextApp.prepare();

    const app: Express = express();

    app.use(
      helmet(),
      cors(),
      express.urlencoded({ extended: true, limit: '10mb' }),
      express.json({ limit: '10mb' })
      // bodyParser.json({ limit: '50mb', extended: true }),
      // bodyParser.urlencoded({ limit: '50mb' })
      /* createLocaleMiddleware({
        priority: ['default', 'accept-language'],
        default: 'sk-SK',
      }) */
    );

    const server = new ApolloServer({
      context: async ({ req }) => ({ token: req.headers['x-access-token'] }),
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
    app.use('/reset-password', resetPassword);
    app.use('/uspesna-platba', sucessPayment);
    app.use('/neuspesna-platba', unsucessPayment);
    app.use('/static/orders/*', orders);
    app.use('/static/invoice/*', invoices);
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
