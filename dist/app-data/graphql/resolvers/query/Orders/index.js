"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../../../db/models/Order"));
const orders = async (root, args, ctx) => {
    const { id } = args;
    const orderItems = id && id.length > 0
        ? (await Order_1.default.find({ userId: id })) || []
        : (await Order_1.default.find()) || [];
    return orderItems;
};
exports.default = orders;
