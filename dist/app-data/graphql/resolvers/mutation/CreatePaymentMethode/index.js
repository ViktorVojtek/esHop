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
const PaymentMethode_1 = __importDefault(require("../../../../db/models/PaymentMethode"));
const error_1 = __importDefault(require("../../utils/error"));
const createDeliveryMethode = async (root, { title, value }, ctx) => {
    try {
        const exist = await PaymentMethode_1.default.findOne({ title });
        if (exist) {
            throw new error_1.default(409, 'Payment methode already exist');
        }
        const newItemData = new PaymentMethode_1.default({ title, value });
        await PaymentMethode_1.default.create(newItemData);
        const _a = newItemData.toObject(), { __v } = _a, returnItemData = __rest(_a, ["__v"]);
        return returnItemData;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = createDeliveryMethode;
