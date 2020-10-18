"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../../../../db/models/Service"));
exports.default = async (root, args, ctx) => {
    try {
        const services = (await Service_1.default.find({})) || [];
        return services;
    }
    catch (err) {
        throw new Error(err);
    }
};
