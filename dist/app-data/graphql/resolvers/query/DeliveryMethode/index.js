"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DeliveryMethode_1 = __importDefault(require("../../../../db/models/DeliveryMethode"));
const error_1 = __importDefault(require("../../utils/error"));
const deliveryMethode = async (root, { id }, ctx) => {
    try {
        const exist = await DeliveryMethode_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(id),
        });
        if (!exist) {
            throw new error_1.default(404, 'Not found');
        }
        return exist;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.default = deliveryMethode;
