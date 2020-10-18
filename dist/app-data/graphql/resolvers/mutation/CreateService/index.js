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
const Service_1 = __importDefault(require("../../../../db/models/Service"));
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        console.log('In create service');
        const { serviceInput } = args;
        const { title } = serviceInput;
        const serviceExist = await Service_1.default.findOne({ title });
        if (serviceExist) {
            throw new error_1.default(403, 'Service allready exist');
        }
        const { img } = serviceInput, restServiceData = __rest(serviceInput, ["img"]);
        const serviceData = new Service_1.default(restServiceData);
        if (img && img.base64) {
            const vId = `${serviceData._id}-${title.toUpperCase()}`;
            const fileData = {
                fileName: img.title,
                fileBase64Data: img.base64,
                dirName: vId,
                extension: img.ext,
            };
            const imgPath = await utils_1.storeFile(fileData);
            const _a = img, { base64 } = _a, restImgData = __rest(_a, ["base64"]);
            const imageData = Object.assign(Object.assign({}, restImgData), { path: imgPath });
            serviceData.img = imageData;
        }
        const newService = await Service_1.default.create(serviceData);
        const _b = newService.toObject(), { __v } = _b, result = __rest(_b, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
