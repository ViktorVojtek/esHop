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
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Order_1 = __importDefault(require("../../../../db/models/Order"));
// import { storeFile } from '../../utils';
const error_1 = __importDefault(require("../../utils/error"));
var order_send_html = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/orderSendTemplate/order_sent.html`), 'utf8');
var order_canceled_html = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/orderCanceledTemplate/order_canceled.html`), 'utf8');
function sendMailNotificationOrderSend(from, to, orderData) {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer_1.default.createTransport({
                host: 'smtp.websupport.sk',
                port: 465,
                secure: true,
                auth: {
                    user: 'eshop@kupelecks.sk',
                    pass: 'Cyp147.?riaN20ck12',
                },
            });
            const templateOrderMail = handlebars.compile(order_send_html);
            var replacement = {
                orderId: orderData.orderId
            };
            const orderSendMailToSend = templateOrderMail(replacement);
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'eshop@kupelecks.sk',
                to,
                subject: 'Červený Kláštor | Vaša objednávka bola odoslaná',
                html: orderSendMailToSend,
            });
            console.log('Message sent: %s', info.messageId);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
function sendMailNotificationOrderCanceled(from, to, orderData) {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer_1.default.createTransport({
                host: 'smtp.websupport.sk',
                port: 465,
                secure: true,
                auth: {
                    user: 'eshop@kupelecks.sk',
                    pass: 'Cyp147.?riaN20ck12',
                },
            });
            const templateOrderMail = handlebars.compile(order_canceled_html);
            var replacement = {
                orderId: orderData.orderId
            };
            const orderSendMailToSend = templateOrderMail(replacement);
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'eshop@kupelecks.sk',
                to,
                subject: 'Červený Kláštor | Vaša objednávka bola zrušená',
                html: orderSendMailToSend,
            });
            console.log('Message sent: %s', info.messageId);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = async (root, args, ctx) => {
    try {
        const { _id, status } = args;
        const serviceExist = await Order_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(_id),
        });
        if (!serviceExist) {
            throw new error_1.default(404, 'Service not exist');
        }
        const updatedOrder = await Order_1.default.findOneAndUpdate({
            _id: mongoose_1.default.Types.ObjectId(_id),
        }, {
            $set: { status },
        }, { new: true });
        const _a = updatedOrder.toObject(), { __v } = _a, result = __rest(_a, ["__v"]);
        if (status === 1) {
            await sendMailNotificationOrderSend('info@codebrothers.sk', result.email, result);
        }
        if (status === 3) {
            await sendMailNotificationOrderCanceled('info@codebrothers.sk', result.email, result);
        }
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
