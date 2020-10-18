"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceSchema = new mongoose_1.default.Schema({
    category: Object,
    discount: Number,
    html: String,
    img: Object,
    price: Object,
    subCategory: Object,
    video: String,
    title: String,
});
exports.default = mongoose_1.default.model('Service', ServiceSchema);
