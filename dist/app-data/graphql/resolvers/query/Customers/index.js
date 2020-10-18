"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
exports.default = async () => {
    const customers = await Customer_1.default.find({});
    return customers || [];
};
