"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    title: String,
    value: Number,
});
const PaymentMethode = mongoose_1.default.model('PaymentMethode', PaymentSchema);
exports.default = PaymentMethode;
