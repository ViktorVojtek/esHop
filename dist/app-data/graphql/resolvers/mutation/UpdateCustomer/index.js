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
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        const { id, customerData: { email, firstName, lastName, password, role } } = args;
        const customerExist = await Customer_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(id) });
        if (!customerExist) {
            throw new error_1.default(404, 'Customer not found');
        }
        const newCustomerData = {
            email,
            firstName,
            lastName,
            password,
            role
        };
        const updatedCustomer = await Customer_1.default.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, newCustomerData);
        const _a = updatedCustomer.toObject(), { __v } = _a, returnCustomerData = __rest(_a, ["__v"]);
        return returnCustomerData;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
