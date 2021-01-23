import { ObjectScalarType } from '../typeDefs/Order';

// queries
import categories from './query/Categories';
import currencies from './query/Currencies';
import customer from './query/Customer';
import customers from './query/Customers';

import deliveryMethode from './query/DeliveryMethode';
import deliveryMethods from './query/DeliveryMethods';
import discount from './query/Discount';
import discounts from './query/Discounts';
import freeDeliveries from './query/FreeDelivery';
import loyalityProducts from './query/LoyalityProduct';
import order from './query/Order';
import orders from './query/Orders';
import paymentMethode from './query/PaymentMethode';
import paymentMethodes from './query/PaymentMethodes';
import productBySlug from './query/ProductsBySlug';
import productsByIds from './query/ProductsByIds';
import products from './query/Products';
import product from './query/Product';
import subCategories from './query/SubCategories';
import service from './query/Service';
import serviceBySlug from './query/ServiceBySlug';
import services from './query/Services';
import users from './query/Users';

// mutations
import createCategory from './mutation/CreateCategory';
import updateCategory from './mutation/UpdateCategory';
import removeCategory from './mutation/RemoveCategory';

import createCustomer from './mutation/CreateCustomer';
import updateCustomer from './mutation/UpdateCustomer';
import logInCustomer from './mutation/LogInCustomer';
import removeCustomer from './mutation/RemoveCustomer';
import changeCustomerPassword from './mutation/ChangeCustomerPassword';
import changeCustomerZonePassword from './mutation/ChangeCustomerZonePassword';

import createDeliveryMethode from './mutation/CreateDeliveryMethode';
import removeDeliveryMethode from './mutation/RemoveDeliveryMethode';

import createPaymentMethode from './mutation/CreatePaymentMethode';
import removePaymentMethode from './mutation/RemovePaymentMethode';

import createDiscount from './mutation/CreateDiscount';
import removeDiscount from './mutation/RemoveDiscount';

import createOrder from './mutation/CreateOrder';
import updateOrder from './mutation/UpdateOrder';
import updatePaymentStatus from './mutation/UpdatePaymentStatus';

import loginUser from './mutation/LoginUser';
import registerUser from './mutation/RegisterUser';

import setCurrency from './mutation/SetCurrency';
import updateCurrency from './mutation/UpdateCurrency';
import removeCurrency from './mutation/RemoveCurrency';

import createProduct from './mutation/CreateProduct';
import updateProduct from './mutation/UpdateProduct';
import removeProduct from './mutation/RemoveProduct';

import createLoyalityProduct from './mutation/CreateLoyalityProduct';
import updateLoyalityProduct from './mutation/UpdateLoyalityProduct';
import removeLoyalityProduct from './mutation/RemoveLoyalityProduct';

import createService from './mutation/CreateService';
import updateService from './mutation/UpdateService';
import removeService from './mutation/RemoveService';

import createSubCategory from './mutation/CreateSubCategory';
import removeSubCategory from './mutation/RemoveSubCategory';

import addToMarketingList from './mutation/AddToMarketingList';
import removeFromMarketingList from './mutation/RemoveFromMarketingList';

import sendOrderEmail from './mutation/SendOrderEmail';

import validateDiscount from './mutation/ValidateDiscount';

import createFreeDelivery from './mutation/CreateFreeDelivery';
import updateFreeDelivery from './mutation/UpdateFreeDelivery';
import removeFreeDelivery from './mutation/RemoveFreeDelivery';

import sendRezervationEmail from './mutation/RezervationEmail';

const resolvers = {
  Object: ObjectScalarType,
  Query: {
    categories: async () => categories(),
    currencies: async () => currencies(),

    customer: async (root: any, args: any, ctx: any) =>
      customer(root, args, ctx),
    customers: async () => customers(),

    deliveryMethode: async (root: any, args: any, ctx: any) =>
      deliveryMethode(root, args, ctx),
    deliveryMethods: async () => deliveryMethods(),

    discount: async (root: any, args: { id: string }, ctx: any) =>
      discount(root, args, ctx),
    discounts: async () => discounts(),

    loyalityProducts: async (root: any, args: any, ctx: any) =>
      loyalityProducts(root, args, ctx),
    order: async (root: any, args: any, ctx: any) => order(root, args, ctx),
    orders: async (root: any, args: { email?: string }, ctx: any) =>
      orders(root, args, ctx),

    paymentMethode: async (root: any, args: { id: string }, ctx: any) =>
      paymentMethode(root, args, ctx),
    paymentMethodes: async () => paymentMethodes(),
    productBySlug: async (root: any, args: any, ctx: any) =>
      productBySlug(root, args, ctx),
    productsByIds: async (root: any, args: any, ctx: any) =>
      productsByIds(root, args, ctx),
    products: async (root: any, args: any, ctx: any) =>
      products(root, args, ctx),
    product: async (root: any, args: any, ctx: any) => product(root, args, ctx),

    service: async (root: any, args: { id: string }, ctx: any) =>
      service(root, args, ctx),
    serviceBySlug: async (root: any, args: any, ctx: any) =>
      serviceBySlug(root, args, ctx),
    services: async (root: any, args: any, ctx: any) =>
      services(root, args, ctx),

    subCategories: async (root: any, args: any, ctx: any) =>
      subCategories(root, args, ctx),
    users: async (root: any, args: any, ctx: any) => users(root, args, ctx),
    freeDeliveries: async () => freeDeliveries(),
  },
  Mutation: {
    createCategory: async (root: any, args: any, ctx: any) =>
      createCategory(root, args, ctx),
    updateCategory: async (root: any, args: any, ctx: any) =>
      updateCategory(root, args, ctx),
    removeCategory: async (root: any, args: any, ctx: any) =>
      removeCategory(root, args, ctx),

    createCustomer: async (root: any, args: any, ctx: any) =>
      createCustomer(root, args, ctx),
    updateCustomer: async (root: any, args: any, ctx: any) =>
      updateCustomer(root, args, ctx),
    logInCustomer: async (root: any, args: any, ctx: any) =>
      logInCustomer(root, args, ctx),
    removeCustomer: (root: any, args: { id: string }, ctx: any) =>
      removeCustomer(root, args, ctx),
    changeCustomerPassword: (root: any, args: { id: string }, ctx: any) =>
      changeCustomerPassword(root, args, ctx),
    changeCustomerZonePassword: (root: any, args: { id: string }, ctx: any) =>
      changeCustomerZonePassword(root, args, ctx),

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
    updateOrder: async (root: any, args: any, ctx: any) =>
      updateOrder(root, args, ctx),
    updatePaymentStatus: async (root: any, args: any, ctx: any) =>
      updatePaymentStatus(root, args, ctx),

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

    createLoyalityProduct: async (root: any, args: any, ctx: any) =>
      createLoyalityProduct(root, args, ctx),
    updateLoyalityProduct: async (root: any, args: any, ctx: any) =>
      updateLoyalityProduct(root, args, ctx),
    removeLoyalityProduct: async (root: any, args: any, ctx: any) =>
      removeLoyalityProduct(root, args, ctx),

    createSubCategory: async (root: any, args: any, ctx: any) =>
      createSubCategory(root, args, ctx),
    removeSubCategory: async (root: any, args: any, ctx: any) =>
      removeSubCategory(root, args, ctx),

    createService: async (root: any, args: any, ctx: any) =>
      createService(root, args, ctx),
    updateService: async (root: any, args: any, ctx: any) =>
      updateService(root, args, ctx),
    removeService: async (root: any, args: any, ctx: any) =>
      removeService(root, args, ctx),

    loginUser: async (root: any, args: any, ctx: any) =>
      loginUser(root, args, ctx),
    registerUser: async (root: any, args: any, ctx: any) =>
      registerUser(root, args, ctx),
    removeProduct: async (root: any, args: any, ctx: any) =>
      removeProduct(root, args, ctx),
    addToMarketingList: async (root: any, args: any, ctx: any) =>
      addToMarketingList(root, args, ctx),
    removeFromMarketingList: async (root: any, args: any, ctx: any) =>
      removeFromMarketingList(root, args, ctx),

    sendOrderEmail: async (root: any, args: any, ctx: any) =>
      sendOrderEmail(root, args, ctx),

    sendRezervationEmail: async (root: any, args: any, ctx: any) =>
      sendRezervationEmail(root, args, ctx),

    validateDiscount: async (root: any, args: any, ctx: any) =>
      validateDiscount(root, args, ctx),

    createFreeDelivery: async (root: any, args: any, ctx: any) =>
      createFreeDelivery(root, args, ctx),
    updateFreeDelivery: async (root: any, args: any, ctx: any) =>
      updateFreeDelivery(root, args, ctx),
    removeFreeDelivery: async (root: any, args: any, ctx: any) =>
      removeFreeDelivery(root, args, ctx),
  },
};

export default resolvers;
