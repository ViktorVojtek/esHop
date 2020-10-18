"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    customerPoints: {
        default: 0,
        type: Number,
    },
    email: String,
    tel: String,
    firstName: String,
    lastName: String,
    password: String,
    role: {
        default: 1,
        type: Number,
    },
});
exports.default = mongoose_1.default.model('Customer', CustomerSchema);
