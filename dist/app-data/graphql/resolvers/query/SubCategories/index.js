"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubCategory_1 = __importDefault(require("../../../../db/models/SubCategory"));
const subCategories = async (root, { categoryId }, ctx) => {
    try {
        const result = categoryId
            ? (await SubCategory_1.default.find({ categoryId })) || []
            : (await SubCategory_1.default.find()) || [];
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = subCategories;
