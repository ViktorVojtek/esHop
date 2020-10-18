"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../../../config");
const Category_1 = __importDefault(require("../../../../db/models/Category"));
const SubCategory_1 = __importDefault(require("../../../../db/models/SubCategory"));
const error_1 = __importDefault(require("../../utils/error"));
const utils_1 = require("../../utils");
const createSubCategory = async (root, { categoryId, title }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const categoryExist = await Category_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(categoryId),
        });
        if (!categoryExist) {
            throw new error_1.default(404, 'Category you are referencing for not exist.');
        }
        const subCategoryExist = await SubCategory_1.default.findOne({ title });
        if (subCategoryExist) {
            throw new error_1.default(403, 'Subcategory allready exist.');
        }
        const subCategoryData = {
            categoryId,
            title,
            signFlag: title.toUpperCase().replace(/ /g, '_'),
        };
        const newSubCategory = new SubCategory_1.default(subCategoryData);
        await SubCategory_1.default.create(newSubCategory);
        const _a = newSubCategory.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = createSubCategory;
