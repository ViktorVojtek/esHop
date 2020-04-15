const express = require('express');
const createLocaleMiddleware = require('express-locale');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const nextjsApp = require('next');
const cors = require('cors');

const typeDefs = require('./app-data/graphql/typeDefs');
const resolvers = require('./app-data/graphql/resolvers');
const db = require('./app-data/db');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = nextjsApp({ dev });
const handle = nextApp.getRequestHandler();
const port = 3012;

const App = async () => {
  try {
    await nextApp.prepare();

    const app = express();

    app.use(
      helmet(),
      cors(),
      bodyParser.json({ limit: '50mb', extended: true }),
      bodyParser.urlencoded({ limit: '50mb', extended: true }),
      createLocaleMiddleware({
        priority: ['default', 'accept-language'],
        default: 'sk-SK',
      })
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

    /* app.get('/admin/products/update', (req, res) => {
      console.log(req.params);
      console.log('\n');
      console.log(req.query);

      return handle(req, res);
    }); */
    app.get('*', (req, res) => handle(req, res));

    app.listen({ port });

    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = App;
