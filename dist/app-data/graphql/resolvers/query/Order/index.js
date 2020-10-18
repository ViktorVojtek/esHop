"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../../../../db/models/Order"));
const error_1 = __importDefault(require("../../utils/error"));
const order = async (root, { _id }, ctx) => {
    const orderExist = await Order_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(_id) });
    if (!orderExist) {
        throw new error_1.default(404, `No order with id: ${_id} has been found`);
    }
    return orderExist;
};
exports.default = order;
