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
const Service_1 = __importDefault(require("../../../../db/models/Service"));
const utils_1 = require("../../utils");
const error_1 = __importDefault(require("../../utils/error"));
exports.default = async (root, args, ctx) => {
    try {
        const { _id, serviceInput } = args;
        const serviceExist = await Service_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!serviceExist) {
            throw new error_1.default(404, 'Service not exist');
        }
        const { img } = serviceInput, restServiceData = __rest(serviceInput, ["img"]);
        const serviceData = restServiceData;
        if (img.base64) {
            const vId = `${_id}-${restServiceData.title.toUpperCase()}`;
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
        const updatedService = await Service_1.default.findOneAndUpdate({
            _id: mongoose_1.default.Types.ObjectId(_id),
        }, {
            $set: {
                category: serviceData.category,
                discount: serviceData.discount,
                html: serviceData.html,
                img: serviceData.img,
                price: serviceData.price,
                subCategory: serviceData.subCategory,
                title: serviceData.title,
                video: serviceData.video,
            },
        });
        const _b = updatedService.toObject(), { __v } = _b, result = __rest(_b, ["__v"]);
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
