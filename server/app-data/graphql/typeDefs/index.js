const Category = require('./Category');
const Currency = require('./Currency');
const root = require('./root');
const Order = require('./Order');
const Product = require('./Product');
const SubCategory = require('./SubCategory');
const User = require('./User');

const typeDefs = [Category, Currency, root, Order, Product, SubCategory, User];

module.exports = typeDefs;
