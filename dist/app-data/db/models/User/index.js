"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    admin: {
        default: false,
        type: Boolean,
    },
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: {
        default: 1,
        type: Number,
    },
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
