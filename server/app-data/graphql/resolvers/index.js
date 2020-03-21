const loginUser = require('./LoginUser');
const registerUser = require('./RegisterUser');

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
    loginUser: async (root, { userLoginInput }, ctx) => loginUser(root, { userLoginInput }, ctx),
    registerUser: async (root, { userRegInput }, ctx) => registerUser(root, { userRegInput }, ctx),
  },
};

module.exports = resolvers;
