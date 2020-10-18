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
const User_1 = __importDefault(require("../../../../db/models/User"));
const error_1 = __importDefault(require("../../utils/error"));
const registerUser = async (root, { userRegInput }, ctx) => {
    try {
        const { email } = userRegInput;
        const userExist = await User_1.default.findOne({ email });
        if (userExist) {
            throw new error_1.default(403, 'User allready exist!');
        }
        const hashedPasw = await bcryptjs_1.default.hash(userRegInput.password, 10);
        const newUserData = Object.assign(Object.assign({}, userRegInput), { password: hashedPasw });
        const userData = new User_1.default(newUserData);
        await User_1.default.create(userData);
        const _a = userData.toObject(), { __v, password } = _a, resultUserData = __rest(_a, ["__v", "password"]);
        return resultUserData;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = registerUser;
