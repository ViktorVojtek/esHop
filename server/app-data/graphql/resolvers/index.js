// queries
const categories = require('./query/Categories');
const users = require('./query/Users');
// mutations
const createCategory = require('./mutation/CreateCategory');
const loginUser = require('./mutation/LoginUser');
const registerUser = require('./mutation/RegisterUser');
const updateCategory = require('./mutation/UpdateCategory');

const resolvers = {
  Query: {
    categories: async () => categories(),
    users: async () => users(),
  },
  Mutation: {
    createCategory: async (root, { title }, ctx) => createCategory(root, { title }, ctx),
    loginUser: async (root, { userLoginInput }, ctx) => loginUser(root, { userLoginInput }, ctx),
    registerUser: async (root, { userRegInput }, ctx) => registerUser(root, { userRegInput }, ctx),
    updateCategory: async (root, { _id, title }, ctx) => updateCategory(root, { _id, title }, ctx),
  },
};

module.exports = resolvers;
