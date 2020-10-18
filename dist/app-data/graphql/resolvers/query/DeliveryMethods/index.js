"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryMethode_1 = __importDefault(require("../../../../db/models/DeliveryMethode"));
const deliveryMethods = async () => {
    try {
        const exist = await DeliveryMethode_1.default.find({});
        return exist || [];
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.default = deliveryMethods;
