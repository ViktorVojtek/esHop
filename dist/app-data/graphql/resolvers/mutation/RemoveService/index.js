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
        const { _id } = args;
        const serviceExist = await Service_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!serviceExist) {
            throw new error_1.default(404, 'Service not exist');
        }
        await Service_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(_id) });
        return 'Service has been successfuly removed';
    }
    catch (err) {
        throw new Error(err.message);
    }
};
