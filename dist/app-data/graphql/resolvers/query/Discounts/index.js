"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discount_1 = __importDefault(require("../../../../db/models/Discount"));
const discounts = async () => {
    try {
        const items = await Discount_1.default.find({});
        return items || [];
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.default = discounts;
