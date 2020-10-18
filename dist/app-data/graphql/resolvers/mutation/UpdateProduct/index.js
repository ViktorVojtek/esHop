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
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../../../../db/models/Product"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const updateProduct = async (root, { _id, productInput }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const productExist = await Product_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!productExist) {
            throw new error_1.default(404, 'Product not exist.');
        }
        const { variants } = productInput, restProductData = __rest(productInput, ["variants"]);
        const productData = Object.assign({}, restProductData);
        let i = 0;
        let variantsData = [];
        while (i < variants.length) {
            let imagesData = [];
            const resultVariant = Object.assign({}, variants[i]);
            if (variants[i].images && variants[i].images.length > 0) {
                const { images } = variants[i];
                if (images && images.length > 0 && images[0].base64) {
                    const vId = `${productData._id}-${variants[i].title.toUpperCase()}`;
                    imagesData = await utils_1.getVariantImagesPaths(images, vId);
                }
                else {
                    imagesData = productExist.variants[i].images;
                }
                resultVariant.images = imagesData;
            }
            variantsData.push(resultVariant);
            i += 1;
        }
        productData.variants = variantsData;
        const updatedProduct = await Product_1.default.findOneAndUpdate({ _id: mongoose_1.default.Types.ObjectId(_id) }, {
            $set: {
                category: productData.category,
                isEnvelopeSize: productData.isEnvelopeSize,
                subCategory: productData.subCategory,
                title: productData.title,
                variants: productData.variants,
            },
        }, { new: true });
        const _a = updatedProduct.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = updateProduct;
