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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const path = __importStar(require("path"));
const fs_extra_1 = require("fs-extra");
const Order_1 = __importDefault(require("../../../db/models/Order"));
exports.verifyToken = (ctx, secret) => new Promise((resolve, reject) => {
    const { token } = ctx;
    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            reject(err);
        }
        const { exp } = decoded;
        const expires = exp * 1000;
        const now = new Date().getTime();
        if (now > expires) {
            const tokenExpired = new Error('Token has expired');
            reject(tokenExpired);
        }
        resolve();
    });
});
exports.removeDir = (dirPath) => new Promise((resolve, reject) => {
    fs_extra_1.remove(dirPath, (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
});
exports.removeFile = (filePath) => new Promise((resolve, reject) => {
    fs_extra_1.unlink(filePath, (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
});
exports.storeFile = (fileData) => new Promise((resolve, reject) => {
    const { fileName, fileBase64Data, dirName, extension } = fileData;
    const base64Data = fileBase64Data.split(';base64,')[1];
    const ext = extension;
    const extNorm = ext === 'jpeg' ? 'jpg' : ext;
    const dir = path.resolve(__dirname, `../../../../../static/products/${dirName}`);
    const filePath = `${dir}/${fileName.toLowerCase()}.${extNorm}`;
    fs_extra_1.mkdirp(dir, (dirErr) => {
        if (dirErr) {
            reject(dirErr);
        }
        fs_extra_1.writeFile(filePath, base64Data, { encoding: 'base64' }, (wFerr) => {
            if (wFerr) {
                reject(wFerr);
            }
            const resultFilePath = `/static${filePath
                .split('static')[1]
                .replace(/\\/g, '/')}`;
            resolve(resultFilePath);
        });
    });
});
function getVariantImagesPaths(images, vId) {
    let j = 0;
    const variantImagesDataArr = [];
    return new Promise(async (resolve) => {
        while (images.length > j) {
            const { base64, title: imageTitle, ext } = images[j];
            const fileData = {
                fileName: imageTitle,
                fileBase64Data: base64,
                dirName: vId,
                extension: ext,
            };
            const promiseFn = exports.storeFile(fileData);
            variantImagesDataArr.push(promiseFn);
            j += 1;
        }
        const paths = await Promise.all(variantImagesDataArr);
        let k = 0;
        const variantImagesData = [];
        while (paths.length > k) {
            const _a = images[k], { base64 } = _a, restImageData = __rest(_a, ["base64"]);
            const imageData = Object.assign(Object.assign({}, restImageData), { path: paths[k] });
            variantImagesData.push(imageData);
            k += 1;
        }
        resolve(variantImagesData);
    });
}
exports.getVariantImagesPaths = getVariantImagesPaths;
async function calculateOrderId() {
    return new Promise(async (resolve, reject) => {
        try {
            let orderId = '00000001';
            const lastOrder = await Order_1.default.findOne({}).sort({ created_at: -1 });
            if (lastOrder) {
                let oINum = parseInt(lastOrder.orderId) + 1;
                let zeros = '';
                for (let i = 0; i < lastOrder.orderId.length - String(oINum).length; i += 1) {
                    zeros += '0';
                }
                orderId = `${zeros}${oINum}`;
                resolve(orderId);
            }
            resolve(orderId);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.calculateOrderId = calculateOrderId;
