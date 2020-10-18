"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../../db/models/User"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const users = async (root, args, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const result = (await User_1.default.find()) || [];
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = users;
