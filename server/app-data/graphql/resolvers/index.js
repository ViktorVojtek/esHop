const createCategory = require('./CreateCategory');
const loginUser = require('./LoginUser');
const registerUser = require('./RegisterUser');
const updateCategory = require('./UpdateCategory');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find() || [];
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createCategory: async (root, { title }, ctx) => createCategory(root, { title }, ctx),
    loginUser: async (root, { userLoginInput }, ctx) => loginUser(root, { userLoginInput }, ctx),
    registerUser: async (root, { userRegInput }, ctx) => registerUser(root, { userRegInput }, ctx),
    updateCategory: async (root, { _id, title }, ctx) => updateCategory(root, { _id, title }, ctx),
  },
};

module.exports = resolvers;
