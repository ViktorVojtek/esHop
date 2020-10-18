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
const config_1 = require("../../../../config");
const Category_1 = __importDefault(require("../../../../db/models/Category"));
const error_1 = __importDefault(require("../../utils/error"));
const utils_1 = require("../../utils");
const createCategory = async (root, { title }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const categoryExist = await Category_1.default.findOne({ title });
        if (categoryExist) {
            throw new error_1.default(403, 'Category allready exist');
        }
        const categoryData = {
            title,
            signFlag: title.toUpperCase().replace(/ /g, '_'),
        };
        const newCategory = new Category_1.default(categoryData);
        await Category_1.default.create(newCategory);
        const _a = newCategory.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = createCategory;
