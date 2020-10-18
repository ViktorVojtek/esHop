"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Currency_1 = __importDefault(require("../../../../db/models/Currency"));
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
const removeCurrency = async (root, { _id }, ctx) => {
    try {
        const { superSecret } = config_1.config;
        await utils_1.verifyToken(ctx, superSecret);
        const currencyExist = await Currency_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!currencyExist) {
            throw new error_1.default(404, 'Currency not exist');
        }
        await Currency_1.default.deleteOne({ _id: mongoose_1.default.Types.ObjectId(_id) });
        return `Currency with _id: ${_id} has been successfuly removed.`;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = removeCurrency;
