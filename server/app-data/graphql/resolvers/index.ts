// queries
import categories from './query/Categories';
import currencies from './query/Currencies';
import order from './query/Order';
import orders from './query/Orders';
import products from './query/Products';
import product from './query/Product';
import subCategories from './query/SubCategories';
import users from './query/Users';

// mutations
import createCategory from './mutation/CreateCategory';
import updateCategory from './mutation/UpdateCategory';
import removeCategory from './mutation/RemoveCategory';

import createOrder from './mutation/CreateOrder';

import loginUser from './mutation/LoginUser';
import registerUser from './mutation/RegisterUser';

import setCurrency from './mutation/SetCurrency';
import updateCurrency from './mutation/UpdateCurrency';
import removeCurrency from './mutation/RemoveCurrency';

import createProduct from './mutation/CreateProduct';
import updateProduct from './mutation/UpdateProduct';
import removeProduct from './mutation/RemoveProduct';

import createSubCategory from './mutation/CreateSubCategory';
import removeSubCategory from './mutation/RemoveSubCategory';

const resolvers = {
  Query: {
    categories: async () => categories(),
    currencies: async () => currencies(),
    order: async (root: any, args: any, ctx: any) => order(root, args, ctx),
    orders: async () => orders(),
    products: async (root: any, args: any, ctx: any) =>
      products(root, args, ctx),
    product: async (root: any, args: any, ctx: any) => product(root, args, ctx),
    subCategories: async (root: any, args: any, ctx: any) =>
      subCategories(root, args, ctx),
    users: async (root: any, args: any, ctx: any) => users(root, args, ctx),
  },
  Mutation: {
    createCategory: async (root: any, args: any, ctx: any) =>
      createCategory(root, args, ctx),
    updateCategory: async (root: any, args: any, ctx: any) =>
      updateCategory(root, args, ctx),
    removeCategory: async (root: any, args: any, ctx: any) =>
      removeCategory(root, args, ctx),

    createOrder: async (root: any, args: any, ctx: any) =>
      createOrder(root, args, ctx),

    setCurrency: async (root: any, args: any, ctx: any) =>
      setCurrency(root, args, ctx),
    updateCurrency: async (root: any, args: any, ctx: any) =>
      updateCurrency(root, args, ctx),
    removeCurrency: async (root: any, args: any, ctx: any) =>
      removeCurrency(root, args, ctx),

    createProduct: async (root: any, args: any, ctx: any) =>
      createProduct(root, args, ctx),
    updateProduct: async (root: any, args: any, ctx: any) =>
      updateProduct(root, args, ctx),

    createSubCategory: async (root: any, args: any, ctx: any) =>
      createSubCategory(root, args, ctx),
    removeSubCategory: async (root: any, args: any, ctx: any) =>
      removeSubCategory(root, args, ctx),

    loginUser: async (root: any, args: any, ctx: any) =>
      loginUser(root, args, ctx),
    registerUser: async (root: any, args: any, ctx: any) =>
      registerUser(root, args, ctx),
    removeProduct: async (root: any, args: any, ctx: any) =>
      removeProduct(root, args, ctx),
  },
};

export default resolvers;