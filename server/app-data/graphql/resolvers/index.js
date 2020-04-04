// queries
const categories = require('./query/Categories');
const currencies = require('./query/Currencies');
const products = require('./query/Products');
const subCategories = require('./query/SubCategories');
const users = require('./query/Users');

// mutations
const createCategory = require('./mutation/CreateCategory');
const updateCategory = require('./mutation/UpdateCategory');
const removeCategory = require('./mutation/RemoveCategory');

const loginUser = require('./mutation/LoginUser');
const registerUser = require('./mutation/RegisterUser');

const setCurrency = require('./mutation/SetCurrency');
const updateCurrency = require('./mutation/UpdateCurrency');
const removeCurrency = require('./mutation/RemoveCurrency');

const createProduct = require('./mutation/CreateProduct');
const updateProduct = require('./mutation/UpdateProduct');
const removeProduct = require('./mutation/RemoveCategory');

const createSubCategory = require('./mutation/CreateSubCategory');
const removeSubCategory = require('./mutation/RemoveSubCategory');

const resolvers = {
  Query: {
    categories: async (root, args, ctx) => categories(root, args, ctx),
    currencies: async (root, args, ctx) => currencies(root, args, ctx),
    products: async (root, args, ctx) => products(root, args, ctx),
    subCategories: async (root, args, ctx) => subCategories(root, args, ctx),
    users: async (root, args, ctx) => users(root, args, ctx),
  },
  Mutation: {
    createCategory: async (root, { title }, ctx) => createCategory(root, { title }, ctx),
    updateCategory: async (root, { _id, title }, ctx) => updateCategory(root, { _id, title }, ctx),
    removeCategory: async (root, { _id }, ctx) => removeCategory(root, { _id }, ctx),

    setCurrency: async (root, { currencyInput }, ctx) => setCurrency(root, { currencyInput }, ctx),
    updateCurrency: async (root, { updateCurrencyInput }, ctx) => updateCurrency(root, { updateCurrencyInput }, ctx),
    removeCurrency: async (root, { _id }, ctx) => removeCurrency(root, { _id }, ctx),

    createProduct: async (root, { productInput }, ctx) => createProduct(root, { productInput }, ctx),
    updateProduct: async (root, { _id, productInput }, ctx) => updateProduct(root, { _id, productInput }, ctx),

    createSubCategory: async (root, { title }, ctx) => createSubCategory(root, { title }, ctx),
    removeSubCategory: async (root, { _id }, ctx) => removeSubCategory(root, { _id }, ctx),

    loginUser: async (root, { userLoginInput }, ctx) => loginUser(root, { userLoginInput }, ctx),
    registerUser: async (root, { userRegInput }, ctx) => registerUser(root, { userRegInput }, ctx),
    removeProduct: async (root, { _id }, ctx) => removeProduct(root, { _id }, ctx),
  },
};

module.exports = resolvers;
