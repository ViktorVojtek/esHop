"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentMethode_1 = __importDefault(require("../../../../db/models/PaymentMethode"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, { id }, ctx) => {
    try {
        const exist = await PaymentMethode_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(id),
        });
        if (!exist) {
            throw new error_1.default(404, 'Not found');
        }
        await PaymentMethode_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(id) });
        return `Payment method with id: ${id} has been sucessfuly deleted.`;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
