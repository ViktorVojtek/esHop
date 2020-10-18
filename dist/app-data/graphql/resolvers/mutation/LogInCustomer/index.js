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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../../config");
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, { customerData }, ctx) => {
    try {
        const { email, password } = customerData;
        const userExist = await Customer_1.default.findOne({ email });
        if (!userExist) {
            throw new error_1.default(404, 'User not exist!');
        }
        const _a = userExist.toObject(), { __v, password: passwordHash } = _a, userData = __rest(_a, ["__v", "password"]);
        const passwordMatch = await bcryptjs_1.default.compare(password, passwordHash);
        if (!passwordMatch) {
            throw new error_1.default(422, 'Incorrect input data');
        }
        const { superSecret } = config_1.config;
        const token = jsonwebtoken_1.default.sign({ email }, superSecret, { expiresIn: '8h' });
        const result = Object.assign(Object.assign({}, userData), { token });
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
};
