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
const mongoose_1 = __importDefault(require("mongoose"));
const Currency_1 = __importDefault(require("../../../../db/models/Currency"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const updateCurrency = async (root, { updateCurrencyInput }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const { _id, defaultCurrency, modifiedByUserId, value, } = updateCurrencyInput;
        const currencyExist = await Currency_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!currencyExist) {
            throw new error_1.default(404, 'Currency not exist');
        }
        const updatedCurrency = await Currency_1.default.findOneAndUpdate({ _id: mongoose_1.default.Types.ObjectId(_id) }, {
            $set: {
                defaultCurrency,
                modifiedByUserId,
                value,
            },
        }, { new: true });
        const _a = updatedCurrency.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = updateCurrency;
