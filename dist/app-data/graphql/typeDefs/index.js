"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("./Category"));
const Currency_1 = __importDefault(require("./Currency"));
const Customer_1 = __importDefault(require("./Customer"));
const DeliveryMethode_1 = __importDefault(require("./DeliveryMethode"));
const Discount_1 = __importDefault(require("./Discount"));
const root_1 = __importDefault(require("./root"));
const Order_1 = __importDefault(require("./Order"));
const PaymentMethode_1 = __importDefault(require("./PaymentMethode"));
const Product_1 = __importDefault(require("./Product"));
const Service_1 = __importDefault(require("./Service"));
const SubCategory_1 = __importDefault(require("./SubCategory"));
const User_1 = __importDefault(require("./User"));
const typeDefs = [
    Category_1.default,
    Currency_1.default,
    Customer_1.default,
    DeliveryMethode_1.default,
    Discount_1.default,
    root_1.default,
    Order_1.default,
    PaymentMethode_1.default,
    Product_1.default,
    Service_1.default,
    SubCategory_1.default,
    User_1.default,
];
exports.default = typeDefs;
