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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        const { customerData: { email, tel, firstName, lastName, password, role }, } = args;
        const customerExist = await Customer_1.default.findOne({ email });
        if (customerExist) {
            throw new error_1.default(409, 'Allready exist');
        }
        const hashedPasw = await bcryptjs_1.default.hash(password, 10);
        const newUserData = {
            email,
            tel,
            firstName,
            lastName,
            password: hashedPasw,
            role,
        };
        const newCustomer = new Customer_1.default(newUserData);
        await Customer_1.default.create(newCustomer);
        const _a = newCustomer.toObject(), { __v } = _a, returnCustomerData = __rest(_a, ["__v"]);
        console.log(returnCustomerData);
        return returnCustomerData;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
