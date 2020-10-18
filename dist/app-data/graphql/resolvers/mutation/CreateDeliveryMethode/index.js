"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryMethode_1 = __importDefault(require("../../../../db/models/DeliveryMethode"));
const error_1 = __importDefault(require("../../utils/error"));
const createDeliveryMethode = async (root, { isEnvelopeSize, title, value }, ctx) => {
    try {
        const exist = await DeliveryMethode_1.default.findOne({ title });
        if (exist) {
            throw new error_1.default(409, 'Delivery methode already exist');
        }
        const newItemData = new DeliveryMethode_1.default({ isEnvelopeSize, title, value });
        await DeliveryMethode_1.default.create(newItemData);
        const _a = newItemData.toObject(), { __v } = _a, returnItemData = __rest(_a, ["__v"]);
        return returnItemData;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = createDeliveryMethode;
