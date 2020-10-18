"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentMethode_1 = __importDefault(require("../../../../db/models/PaymentMethode"));
exports.default = async () => {
    try {
        const exist = (await PaymentMethode_1.default.find()) || [];
        return exist;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
