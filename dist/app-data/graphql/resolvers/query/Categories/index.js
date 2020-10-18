"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../../../db/models/Category"));
const categories = async () => {
    try {
        const result = (await Category_1.default.find()) || [];
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = categories;
