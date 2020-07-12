// queries
import categories from './query/Categories';
import currencies from './query/Currencies';
import deliveryMethode from './query/DeliveryMethode';
import deliveryMethods from './query/DeliveryMethods';
import discount from './query/Discount';
import discounts from './query/Discounts';
import order from './query/Order';
import orders from './query/Orders';
import paymentMethode from './query/PaymentMethode';
import paymentMethodes from './query/PaymentMethodes';
import products from './query/Products';
import product from './query/Product';
import subCategories from './query/SubCategories';
import users from './query/Users';

// mutations
import createCategory from './mutation/CreateCategory';
import updateCategory from './mutation/UpdateCategory';
import removeCategory from './mutation/RemoveCategory';

import createDeliveryMethode from './mutation/CreateDeliveryMethode';
import removeDeliveryMethode from './mutation/RemoveDeliveryMethode';

import createPaymentMethode from './mutation/CreatePaymentMethode';
import removePaymentMethode from './mutation/RemovePaymentMethode';

import createDiscount from './mutation/CreateDiscount';
import removeDiscount from './mutation/RemoveDiscount';

import createOrder from './mutation/CreateOrder';

import loginUser from './mutation/LoginUser';
import registerUser from './mutation/RegisterUser';

import setCurrency from './mutation/SetCurrency';
import updateCurrency from './mutation/UpdateCurrency';
import removeCurrency from './mutation/RemoveCurrency';

import createProduct from './mutation/CreateProduct';
// import updateProduct from './mutation/UpdateProduct';
import removeProduct from './mutation/RemoveProduct';

import createSubCategory from './mutation/CreateSubCategory';
import removeSubCategory from './mutation/RemoveSubCategory';

const resolvers = {
  Query: {
    categories: async () => categories(),
    currencies: async () => currencies(),
    deliveryMethode: async (root: any, args: any, ctx: any) =>
      deliveryMethode(root, args, ctx),
    deliveryMethods: async () => deliveryMethods(),

    discount: async (root: any, args: { id: string }, ctx: any) =>
      discount(root, args, ctx),
    discounts: async () => discounts(),
    order: async (root: any, args: any, ctx: any) => order(root, args, ctx),
    orders: async () => orders(),

    paymentMethode: async (root: any, args: { id: string }, ctx: any) =>
      paymentMethode(root, args, ctx),
    paymentMethodes: async () => paymentMethodes(),
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

    createDeliveryMethode: async (root: any, args: any, ctx: any) =>
      createDeliveryMethode(root, args, ctx),
    removeDeliveryMethode: async (root: any, args: { id: string }, ctx: any) =>
      removeDeliveryMethode(root, args, ctx),

    createPaymentMethode: async (root: any, args: any, ctx: any) =>
      createPaymentMethode(root, args, ctx),
    removePaymentMethode: async (root: any, args: any, ctx: any) =>
      removePaymentMethode(root, args, ctx),

    createDiscount: async (
      root: any,
      args: { code: string; value: number },
      ctx: any
    ) => createDiscount(root, args, ctx),
    removeDiscount: async (root: any, args: { id: string }, ctx: any) =>
      removeDiscount(root, args, ctx),

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
    // updateProduct: async (root: any, args: any, ctx: any) =>
    // updateProduct(root, args, ctx),

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
