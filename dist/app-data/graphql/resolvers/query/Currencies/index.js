"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = __importDefault(require("../../../../db/models/Currency"));
const currencies = async () => {
    try {
        const result = (await Currency_1.default.find()) || [];
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = currencies;
