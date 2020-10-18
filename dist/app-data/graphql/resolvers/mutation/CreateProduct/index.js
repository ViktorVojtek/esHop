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
/* eslint-disable no-underscore-dangle */
const Product_1 = __importDefault(require("../../../../db/models/Product"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const createProduct = async (root, { productInput }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const { title } = productInput;
        const productExist = await Product_1.default.findOne({ title });
        if (productExist) {
            throw new error_1.default(403, 'Product already exist.');
        }
        const { variants } = productInput, restProductData = __rest(productInput, ["variants"]);
        const productData = new Product_1.default(restProductData);
        let i = 0;
        let variantsData = [];
        while (variants.length > i) {
            const { images } = variants[i];
            let imagesData = [];
            if (images && images.length > 0) {
                const vId = `${productData._id}-${variants[i].title.toUpperCase()}`;
                imagesData = await utils_1.getVariantImagesPaths(images, vId);
            }
            const resultVariant = Object.assign(Object.assign({}, variants[i]), { images: imagesData });
            variantsData.push(resultVariant);
            i += 1;
        }
        const newProductData = Object.assign(Object.assign({}, productData.toObject()), { variants: variantsData });
        const newProduct = await Product_1.default.create(newProductData);
        const _a = newProduct.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = createProduct;
