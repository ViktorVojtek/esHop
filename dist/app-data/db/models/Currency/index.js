"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CurrencySchema = new mongoose_1.default.Schema({
    defaultCurrency: Boolean,
    flag: String,
    modifiedByUserId: String,
    sign: String,
    valueSetDate: Date,
    value: {
        default: 1,
        type: Number,
    },
    title: String,
});
const Currency = mongoose_1.default.model('Currency', CurrencySchema);
exports.default = Currency;
