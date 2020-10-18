"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
const Product_1 = __importDefault(require("../../../../db/models/Product"));
const Products = async (root, { categoryId, subCategoryId }, ctx) => {
    try {
        const result = subCategoryId
            ? (await Product_1.default.find({ 'subCategory.id': subCategoryId })) || []
            : categoryId
                ? (await Product_1.default.find({ 'category.id': categoryId })) || []
                : (await Product_1.default.find()) || [];
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = Products;
