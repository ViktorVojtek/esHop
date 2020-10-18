"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        const { id } = args;
        const customer = await Customer_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(id) });
        if (!customer) {
            throw new error_1.default(404, 'Customer not found');
        }
        return customer;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
