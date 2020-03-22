const Category = require('./Category');
const Currency = require('./Currency');
const root = require('./root');
const Product = require('./Product');
const User = require('./User');

const typeDefs = [Category, Currency, root, Product, User];

module.exports = typeDefs;
