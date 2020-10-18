"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../typeDefs/Order");
// queries
const Categories_1 = __importDefault(require("./query/Categories"));
const Currencies_1 = __importDefault(require("./query/Currencies"));
const Customer_1 = __importDefault(require("./query/Customer"));
const Customers_1 = __importDefault(require("./query/Customers"));
const DeliveryMethode_1 = __importDefault(require("./query/DeliveryMethode"));
const DeliveryMethods_1 = __importDefault(require("./query/DeliveryMethods"));
const Discount_1 = __importDefault(require("./query/Discount"));
const Discounts_1 = __importDefault(require("./query/Discounts"));
const Order_2 = __importDefault(require("./query/Order"));
const Orders_1 = __importDefault(require("./query/Orders"));
const PaymentMethode_1 = __importDefault(require("./query/PaymentMethode"));
const PaymentMethodes_1 = __importDefault(require("./query/PaymentMethodes"));
const Products_1 = __importDefault(require("./query/Products"));
const Product_1 = __importDefault(require("./query/Product"));
const SubCategories_1 = __importDefault(require("./query/SubCategories"));
const Service_1 = __importDefault(require("./query/Service"));
const Services_1 = __importDefault(require("./query/Services"));
const Users_1 = __importDefault(require("./query/Users"));
// mutations
const CreateCategory_1 = __importDefault(require("./mutation/CreateCategory"));
const UpdateCategory_1 = __importDefault(require("./mutation/UpdateCategory"));
const RemoveCategory_1 = __importDefault(require("./mutation/RemoveCategory"));
const CreateCustomer_1 = __importDefault(require("./mutation/CreateCustomer"));
const UpdateCustomer_1 = __importDefault(require("./mutation/UpdateCustomer"));
const LogInCustomer_1 = __importDefault(require("./mutation/LogInCustomer"));
const RemoveCustomer_1 = __importDefault(require("./mutation/RemoveCustomer"));
const CreateDeliveryMethode_1 = __importDefault(require("./mutation/CreateDeliveryMethode"));
const RemoveDeliveryMethode_1 = __importDefault(require("./mutation/RemoveDeliveryMethode"));
const CreatePaymentMethode_1 = __importDefault(require("./mutation/CreatePaymentMethode"));
const RemovePaymentMethode_1 = __importDefault(require("./mutation/RemovePaymentMethode"));
const CreateDiscount_1 = __importDefault(require("./mutation/CreateDiscount"));
const RemoveDiscount_1 = __importDefault(require("./mutation/RemoveDiscount"));
const CreateOrder_1 = __importDefault(require("./mutation/CreateOrder"));
const UpdateOrder_1 = __importDefault(require("./mutation/UpdateOrder"));
const LoginUser_1 = __importDefault(require("./mutation/LoginUser"));
const RegisterUser_1 = __importDefault(require("./mutation/RegisterUser"));
const SetCurrency_1 = __importDefault(require("./mutation/SetCurrency"));
const UpdateCurrency_1 = __importDefault(require("./mutation/UpdateCurrency"));
const RemoveCurrency_1 = __importDefault(require("./mutation/RemoveCurrency"));
const CreateProduct_1 = __importDefault(require("./mutation/CreateProduct"));
const UpdateProduct_1 = __importDefault(require("./mutation/UpdateProduct"));
const RemoveProduct_1 = __importDefault(require("./mutation/RemoveProduct"));
const CreateService_1 = __importDefault(require("./mutation/CreateService"));
const UpdateService_1 = __importDefault(require("./mutation/UpdateService"));
const RemoveService_1 = __importDefault(require("./mutation/RemoveService"));
const CreateSubCategory_1 = __importDefault(require("./mutation/CreateSubCategory"));
const RemoveSubCategory_1 = __importDefault(require("./mutation/RemoveSubCategory"));
const resolvers = {
    Object: Order_1.ObjectScalarType,
    Query: {
        categories: async () => Categories_1.default(),
        currencies: async () => Currencies_1.default(),
        customer: async (root, args, ctx) => Customer_1.default(root, args, ctx),
        customers: async () => Customers_1.default(),
        deliveryMethode: async (root, args, ctx) => DeliveryMethode_1.default(root, args, ctx),
        deliveryMethods: async () => DeliveryMethods_1.default(),
        discount: async (root, args, ctx) => Discount_1.default(root, args, ctx),
        discounts: async () => Discounts_1.default(),
        order: async (root, args, ctx) => Order_2.default(root, args, ctx),
        orders: async (root, args, ctx) => Orders_1.default(root, args, ctx),
        paymentMethode: async (root, args, ctx) => PaymentMethode_1.default(root, args, ctx),
        paymentMethodes: async () => PaymentMethodes_1.default(),
        products: async (root, args, ctx) => Products_1.default(root, args, ctx),
        product: async (root, args, ctx) => Product_1.default(root, args, ctx),
        service: async (root, args, ctx) => Service_1.default(root, args, ctx),
        services: async (root, args, ctx) => Services_1.default(root, args, ctx),
        subCategories: async (root, args, ctx) => SubCategories_1.default(root, args, ctx),
        users: async (root, args, ctx) => Users_1.default(root, args, ctx),
    },
    Mutation: {
        createCategory: async (root, args, ctx) => CreateCategory_1.default(root, args, ctx),
        updateCategory: async (root, args, ctx) => UpdateCategory_1.default(root, args, ctx),
        removeCategory: async (root, args, ctx) => RemoveCategory_1.default(root, args, ctx),
        createCustomer: async (root, args, ctx) => CreateCustomer_1.default(root, args, ctx),
        updateCustomer: async (root, args, ctx) => UpdateCustomer_1.default(root, args, ctx),
        logInCustomer: async (root, args, ctx) => LogInCustomer_1.default(root, args, ctx),
        removeCustomer: (root, args, ctx) => RemoveCustomer_1.default(root, args, ctx),
        createDeliveryMethode: async (root, args, ctx) => CreateDeliveryMethode_1.default(root, args, ctx),
        removeDeliveryMethode: async (root, args, ctx) => RemoveDeliveryMethode_1.default(root, args, ctx),
        createPaymentMethode: async (root, args, ctx) => CreatePaymentMethode_1.default(root, args, ctx),
        removePaymentMethode: async (root, args, ctx) => RemovePaymentMethode_1.default(root, args, ctx),
        createDiscount: async (root, args, ctx) => CreateDiscount_1.default(root, args, ctx),
        removeDiscount: async (root, args, ctx) => RemoveDiscount_1.default(root, args, ctx),
        createOrder: async (root, args, ctx) => CreateOrder_1.default(root, args, ctx),
        updateOrder: async (root, args, ctx) => UpdateOrder_1.default(root, args, ctx),
        setCurrency: async (root, args, ctx) => SetCurrency_1.default(root, args, ctx),
        updateCurrency: async (root, args, ctx) => UpdateCurrency_1.default(root, args, ctx),
        removeCurrency: async (root, args, ctx) => RemoveCurrency_1.default(root, args, ctx),
        createProduct: async (root, args, ctx) => CreateProduct_1.default(root, args, ctx),
        updateProduct: async (root, args, ctx) => UpdateProduct_1.default(root, args, ctx),
        createSubCategory: async (root, args, ctx) => CreateSubCategory_1.default(root, args, ctx),
        removeSubCategory: async (root, args, ctx) => RemoveSubCategory_1.default(root, args, ctx),
        createService: async (root, args, ctx) => CreateService_1.default(root, args, ctx),
        updateService: async (root, args, ctx) => UpdateService_1.default(root, args, ctx),
        removeService: async (root, args, ctx) => RemoveService_1.default(root, args, ctx),
        loginUser: async (root, args, ctx) => LoginUser_1.default(root, args, ctx),
        registerUser: async (root, args, ctx) => RegisterUser_1.default(root, args, ctx),
        removeProduct: async (root, args, ctx) => RemoveProduct_1.default(root, args, ctx),
    },
};
exports.default = resolvers;
