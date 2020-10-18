"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import * as createLocaleMiddleware from 'express-locale';
const apollo_server_express_1 = require("apollo-server-express");
// import bodyParser from 'body-parser';
const helmet_1 = __importDefault(require("helmet"));
const next_1 = __importDefault(require("next"));
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = __importDefault(require("./app-data/graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./app-data/graphql/resolvers"));
const db_1 = __importDefault(require("./app-data/db"));
const payment_1 = __importDefault(require("./app-data/routes/payment"));
const subscribe_1 = __importDefault(require("./app-data/routes/subscribe"));
const invoice_omega_1 = __importDefault(require("./app-data/routes/invoice-omega"));
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next_1.default({ dev });
const handle = nextApp.getRequestHandler();
const port = 3016;
const App = async () => {
    try {
        await nextApp.prepare();
        const app = express_1.default();
        app.use(helmet_1.default(), cors_1.default(), express_1.default.urlencoded({ extended: true, limit: '10mb' }), express_1.default.json({ limit: '10mb' })
        // bodyParser.json({ limit: '50mb', extended: true }),
        // bodyParser.urlencoded({ limit: '50mb' })
        /* createLocaleMiddleware({
          priority: ['default', 'accept-language'],
          default: 'sk-SK',
        }) */
        );
        const server = new apollo_server_express_1.ApolloServer({
            context: async ({ req }) => ({ token: req.headers['x-access-token'] }),
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default,
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
        await db_1.default();
        // await setup();
        app.use('/invoice-omega', invoice_omega_1.default);
        app.use('/subscribe', subscribe_1.default);
        app.use('/payment', payment_1.default);
        app.all('*', (req, res) => handle(req, res));
        app.listen({ port });
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.default = App;
