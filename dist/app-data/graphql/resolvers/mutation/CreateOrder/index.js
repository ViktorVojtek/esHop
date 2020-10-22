"use strict";
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
const Customer_1 = __importDefault(require("../../../../db/models/Customer"));
const Order_1 = __importDefault(require("../../../../db/models/Order"));
const utils_1 = require("../../utils");
const formatPrice = (number) => {
    let numberToFormat = number.toFixed(2).toString();
    return numberToFormat.replace('.', ',');
};
var orderPDF = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/productsOrder/template.html`), 'utf8');
const orderCreated = fs.readFileSync(path.join(__dirname, `../../../../../../public/html/orderTemplate/order_created.html`), 'utf8');
function sendMailNotification(from, to, orderData, giftCards) {
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
            const templateOrderMail = handlebars.compile(orderCreated);
            var replacement = {
                orderId: orderData.orderId,
                date: orderData.createdAt,
                name: orderData.firstName,
                surname: orderData.lastName,
                address: orderData.address,
                deliveryAdress: {
                    address: orderData.optionalAddress != ''
                        ? orderData.optionalAddress
                        : orderData.address,
                    postalCode: orderData.optionalAddress != ''
                        ? orderData.optionalPostalCode
                        : orderData.postalCode,
                    city: orderData.optionalAddress != ''
                        ? orderData.optionalCity
                        : orderData.city,
                    state: orderData.optionalAddress != ''
                        ? orderData.optionalState
                        : orderData.state,
                },
                postalCode: orderData.postalCode,
                city: orderData.city,
                state: orderData.state,
                phone: orderData.phone,
                deliveryMethod: orderData.deliveryMethode,
                paymentMethod: orderData.paymentMethode,
                products: orderData.products ? orderData.products : [],
                totalPriceWithoutVat: formatPrice(orderData.totalPriceWithoutVat),
                totalPriceVat: formatPrice(orderData.totalPriceVat),
                totalPrice: formatPrice(orderData.totalPrice),
                isBankovyPrevod: orderData.paymentMethod === 'Bankový prevod',
                giftCards: giftCards ? giftCards : [],
                areProducts: orderData.products.length > 0,
                areGiftCards: giftCards.length > 0,
                isCompany: orderData.companyName != '',
                companyName: orderData.companyName,
                companyVatNum: orderData.companyVatNum,
                companyDVATNum: orderData.companyDVATNum,
                companyDTAXNum: orderData.companyDTAXNum,
            };
            const orderMailToSend = templateOrderMail(replacement);
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'eshop@kupelecks.sk',
                to,
                subject: 'Červený Kláštor | Vaša objednávka bola prijatá',
                html: orderMailToSend,
            });
            console.log('Message sent: %s', info.messageId);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
const createOrder = async (root, { data }, ctx, orderIdIn) => {
    let updatedData;
    let orderId = '';
    let createdAt = new Date().toLocaleDateString('sk-SK');
    let totalPriceWithoutVat = 0;
    let totalPriceVat = 0;
    if (!orderIdIn) {
        orderId = await utils_1.calculateOrderId();
    }
    else {
        orderId = orderIdIn;
    }
    totalPriceWithoutVat = data.totalPrice / 1.2;
    totalPriceWithoutVat = Math.round(totalPriceWithoutVat * 100) / 100;
    totalPriceVat = data.totalPrice - data.totalPrice / 1.2;
    totalPriceVat = Math.round(totalPriceVat * 100) / 100;
    updatedData = Object.assign(Object.assign({}, data), { orderId,
        createdAt,
        totalPriceWithoutVat,
        totalPriceVat });
    const newOrder = new Order_1.default(updatedData);
    await Order_1.default.create(newOrder);
    const filteredProducts = updatedData.products.filter((product) => product.variant !== undefined);
    const readyData = Object.assign(Object.assign({}, updatedData), { products: filteredProducts });
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
    const giftCards = updatedData.products.filter((product) => product.variant === undefined);
    giftCards.forEach((card) => {
        card.services.length > 0
            ? (card.areServices = true)
            : (card.areServices = false);
    });
    const pdfData = Object.assign(Object.assign({}, readyData), { giftCards });
    const document = {
        html: orderPDF,
        data: pdfData,
        path: path.join(__dirname, `../../../../../../static/orders/order-${orderId}.pdf`),
    };
    await pdf.create(document);
    await sendMailNotification('info@codebrothers.sk', readyData.email, readyData, giftCards);
    const { userId } = readyData;
    if (userId) {
        const customerExist = await Customer_1.default.findOne({
            _id: mongoose_1.default.Types.ObjectId(userId),
        });
        /* if (!customerExist) {
          throw new ModError(404, 'Customer does not exist');
        } */
        const custData = customerExist.toObject();
        const updatedCustData = Object.assign(Object.assign({}, custData), { customerPoints: custData.customerPoints + updatedData.totalPrice * 100 });
        await Customer_1.default.findByIdAndUpdate(userId, updatedCustData);
    }
    // const { __v, ...result } = newOrder.toObject();
    return 'Order has been created.';
};
exports.default = createOrder;
