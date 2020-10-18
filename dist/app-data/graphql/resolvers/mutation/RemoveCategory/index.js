"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Category_1 = __importDefault(require("../../../../db/models/Category"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const removeCategory = async (root, { _id }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const categoryExist = await Category_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!categoryExist) {
            throw new error_1.default(404, 'Category not exist');
        }
        await Category_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(_id) });
        return `Category with _id: ${_id} has been successfuly removed.`;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = removeCategory;
