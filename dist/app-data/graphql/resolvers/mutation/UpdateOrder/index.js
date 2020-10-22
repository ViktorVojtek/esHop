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
const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Order_1 = __importDefault(require("../../../../db/models/Order"));
const error_1 = __importDefault(require("../../utils/error"));
const formatPrice = (number) => {
    let numberToFormat = number.toFixed(2).toString();
    return numberToFormat.replace('.', ',');
};
var invoice_pdf = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/invoiceTemplate/template.html`), 'utf8');
var order_send_html = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/orderSendTemplate/order_sent.html`), 'utf8');
var order_solved_html = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/orderSolvedTemplate/order_solved.html`), 'utf8');
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
function sendMailNotificationOrderSolved(from, to, orderData) {
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
            const templateOrderSolvedMail = handlebars.compile(order_solved_html);
            var replacement = {
                orderId: orderData.orderId
            };
            const orderSolvedMailToSend = templateOrderSolvedMail(replacement);
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'eshop@kupelecks.sk',
                to,
                subject: 'Červený Kláštor | Vaša objednávka bola odoslaná',
                html: orderSolvedMailToSend,
                attachments: [{
                        filename: `faktúra-${orderData.orderId}.pdf`,
                        path: path.join(__dirname, `../../../../../../static/invoice/invoice-${orderData.orderId}.pdf`),
                        contentType: 'application/pdf'
                    }],
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
        if (status === 2) {
            const filteredProducts = result.products.filter((product) => product.variant !== undefined);
            const isDeliveryAddress = result.optionalAddress !== '';
            const isCompany = result.companyName !== '';
            let totalPriceWithoutVat = result.totalPrice / 1.2;
            totalPriceWithoutVat = Math.round(totalPriceWithoutVat * 100) / 100;
            let totalPriceVat = result.totalPrice - result.totalPrice / 1.2;
            totalPriceVat = Math.round(totalPriceVat * 100) / 100;
            const createdAt = new Date().toLocaleDateString('sk-SK');
            const readyData = Object.assign(Object.assign({}, result), { products: filteredProducts, isDeliveryAddress: isDeliveryAddress, isCompany: isCompany, totalPriceWithoutVat: formatPrice(totalPriceWithoutVat), totalPriceVat: formatPrice(totalPriceVat), totalPrice: formatPrice(result.totalPrice), createdAt: createdAt });
            readyData.products.forEach((product) => {
                if (product.type !== 'poukazka') {
                    product.price = product.variant.discount
                        ? product.variant.price.value -
                            (product.variant.price.value * product.variant.discount) / 100
                        : product.variant.price.value;
                    product.price = Math.round(product.price * 100) / 100;
                    product.totalPrice = product.variant.count * product.price;
                    product.totalPriceVat = product.totalPrice - product.totalPrice / 1.2;
                    product.totalPriceVat = Math.round(product.totalPriceVat * 100) / 100;
                    product.totalPriceWithoutVat = product.totalPrice / 1.2;
                    product.totalPriceWithoutVat =
                        Math.round(product.totalPriceWithoutVat * 100) / 100;
                    product.price = formatPrice(product.price);
                    product.totalPrice = formatPrice(product.totalPrice);
                    product.totalPriceVat = formatPrice(product.totalPriceVat);
                    product.totalPriceWithoutVat = formatPrice(product.totalPriceWithoutVat);
                }
            });
            const giftCards = result.products.filter((product) => product.variant === undefined);
            giftCards.forEach((card) => {
                card.price = Math.round(card.price * 100) / 100;
                card.totalPriceWithoutVat = card.price / 1.2;
                card.totalPriceWithoutVat = Math.round(card.totalPriceWithoutVat * 100) / 100;
                card.totalPriceVat = card.price - card.price / 1.2;
                card.totalPriceVat = Math.round(card.totalPriceVat * 100) / 100;
                card.price = formatPrice(card.price);
                card.totalPriceWithoutVat = formatPrice(card.totalPriceWithoutVat);
                card.totalPriceVat = formatPrice(card.totalPriceVat);
                card.services.length > 0
                    ? (card.areServices = true)
                    : (card.areServices = false);
            });
            const pdfData = Object.assign(Object.assign({}, readyData), { giftCards });
            const document = {
                html: invoice_pdf,
                data: pdfData,
                path: path.join(__dirname, `../../../../../../static/invoice/invoice-${result.orderId}.pdf`),
            };
            await pdf.create(document);
            await sendMailNotificationOrderSolved('info@codebrothers.sk', result.email, result);
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
