"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../../../../db/models/Product"));
const error_1 = __importDefault(require("../../utils/error"));
const product = async (root, { id }, ctx) => {
    const exist = await Product_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(id) });
    if (!exist) {
        throw new error_1.default(404, 'Product not exist');
    }
    return exist;
};
exports.default = product;
