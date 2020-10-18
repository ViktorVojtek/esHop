"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../../../../db/models/Product"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const removeProduct = async (root, { _id }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const productExist = await Product_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!productExist) {
            throw new error_1.default(404, 'Product not exist');
        }
        await Product_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(_id) });
        /* const imagesToDelete = [];
    
        productExist.images.forEach((item) => {
          const itemPath = path.resolve(
            __dirname,
            `../../../../../../public/products/${
              item.path.split('/')[item.path.split('/').length - 2]
            }`
          );
    
          const removeItemDir = removeDir(itemPath);
    
          imagesToDelete.push(removeItemDir);
        });
    
        await Promise.all(imagesToDelete); */
        return `Product with _id: ${_id} has been successfuly removed`;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = removeProduct;
