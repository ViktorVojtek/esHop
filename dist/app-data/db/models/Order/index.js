"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: String,
    address: String,
    city: String,
    created_at: {
        default: () => new Date(),
        type: Date,
    },
    companyDVATNum: String,
    companyName: String,
    companyVatNum: String,
    deliveryMethode: String,
    email: String,
    firstName: String,
    lastName: String,
    message: String,
    optionalAddress: String,
    optionalCity: String,
    optionalPostalCode: String,
    paymentMethode: String,
    phone: String,
    postalCode: String,
    state: String,
    optionalState: String,
    status: {
        default: 0,
        type: Number,
    },
    totalPrice: Number,
    orderId: String,
    products: [Object],
});
exports.default = mongoose_1.default.model('Order', OrderSchema);
