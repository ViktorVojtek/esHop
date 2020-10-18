"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DeliverySchema = new mongoose_1.default.Schema({
    isEnvelopeSize: {
        type: Boolean,
        default: false,
    },
    title: String,
    value: Number,
});
const DeliveryMethode = mongoose_1.default.model('DeliveryMethode', DeliverySchema);
exports.default = DeliveryMethode;
