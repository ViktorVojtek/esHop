"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
const utils_1 = require("../../graphql/resolvers/utils");
exports.default = async (orderData, next) => {
    const { gp: { ClientID, ClientName, ClientPass, StoreKey }, } = config_1.config;
    const orderId = await utils_1.calculateOrderId();
    const amount = orderData.totalPrice; // total sum of transaction
    const currency = 978;
    const oid = orderId; // unique identifier of order
    const okUrl = 'http://localhost:3016/payment/success';
    const failUrl = 'http://localhost:3016/payment/error';
    const tranType = 'Auth';
    const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||||${currency}|${StoreKey}`;
    const hash = crypto_1.default.createHmac('sha512', 'key');
    const hashedData = hash.update(plainText);
    const genHash = hashedData.digest('hex');
    const base64Buff = Buffer.from(genHash, 'base64');
    const base64 = base64Buff.toString('base64');
    console.log(base64);
    /* const nestpay = new nodeNestpay({
      name: '',
      password: '',
      clientId: ClientID
    }) as any; */
    next();
};
