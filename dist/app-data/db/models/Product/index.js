"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    category: Object,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateDeleted: Date,
    dateModified: Date,
    deleted: {
        default: false,
        type: Boolean,
    },
    modifiedByUserId: String,
    subCategory: Object,
    isEnvelopeSize: {
        type: Boolean,
        default: false,
    },
    title: String,
    variants: [Object],
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
