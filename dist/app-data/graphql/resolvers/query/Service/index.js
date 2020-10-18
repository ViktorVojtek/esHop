"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Service_1 = __importDefault(require("../../../../db/models/Service"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        const { id } = args;
        const service = await Service_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(id) });
        if (!service) {
            throw new error_1.default(404, 'Service not exist');
        }
        return service;
    }
    catch (err) {
        throw new Error(err);
    }
};
