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
const Currency_1 = __importDefault(require("../../../../db/models/Currency"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const setCurrency = async (root, { currencyInput }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const { title } = currencyInput;
        const currencyExist = await Currency_1.default.findOne({ title });
        if (currencyExist) {
            throw new error_1.default(403, 'Currency allready exist');
        }
        const currencyData = Object.assign(Object.assign({}, currencyInput), { flag: title.toUpperCase().replace(/ /g, '_') });
        const newCurrencyData = new Currency_1.default(currencyData);
        await Currency_1.default.create(newCurrencyData);
        const _a = newCurrencyData.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = setCurrency;
