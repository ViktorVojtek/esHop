const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Order, { IOrder } from '../../../../db/models/Order';
import { calculateInvoiceId } from '../../utils';
import ModError from '../../utils/error';

const formatPrice = (number: number) => {
  let numberToFormat = number.toFixed(2).toString();
  return numberToFormat.replace('.', ',');
};

var invoice_pdf = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/invoiceTemplate/template.html`
  ),
  'utf8'
);

var order_send_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderSendTemplate/order_sent.html`
  ),
  'utf8'
);

var order_solved_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderSolvedTemplate/order_solved.html`
  ),
  'utf8'
);

var order_canceled_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderCanceledTemplate/order_canceled.html`
  ),
  'utf8'
);

function sendMailNotificationOrderSend(
  from: string,
  to: string,
  orderData: any
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.websupport.sk',
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: 'eshop@kupelecks.sk', // generated ethereal user
          pass: 'Cyp147.?riaN20ck12', // generated ethereal password
        },
      });

      const templateOrderMail = handlebars.compile(order_send_html);
      var replacement = {
        orderId: orderData.orderId,
      };

      const orderSendMailToSend = templateOrderMail(replacement);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'eshop@kupelecks.sk',
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola odoslaná', // Subject line
        html: orderSendMailToSend, // html body
      });

      console.log('Message sent: %s', info.messageId);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function sendMailNotificationOrderSolved(
  from: string,
  to: string,
  orderData: any
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.websupport.sk',
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: 'eshop@kupelecks.sk', // generated ethereal user
          pass: 'Cyp147.?riaN20ck12', // generated ethereal password
        },
      });

      const templateOrderSolvedMail = handlebars.compile(order_solved_html);
      var replacement = {
        orderId: orderData.orderId,
        invoiceId: orderData.invoiceId,
      };

      const orderSolvedMailToSend = templateOrderSolvedMail(replacement);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'eshop@kupelecks.sk',
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola odoslaná', // Subject line
        html: orderSolvedMailToSend, // html body
        attachments: [
          {
            filename: `faktúra-${orderData.invoiceId}.pdf`,
            path: path.join(
              __dirname,
              `../../../../../../static/invoice/invoice-${orderData.invoiceId}.pdf`
            ),
            contentType: 'application/pdf',
          },
        ],
      });

      console.log('Message sent: %s', info.messageId);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function sendMailNotificationOrderCanceled(
  from: string,
  to: string,
  orderData: any
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.websupport.sk',
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: 'eshop@kupelecks.sk', // generated ethereal user
          pass: 'Cyp147.?riaN20ck12', // generated ethereal password
        },
      });

      const templateOrderMail = handlebars.compile(order_canceled_html);
      var replacement = {
        orderId: orderData.orderId,
      };

      const orderSendMailToSend = templateOrderMail(replacement);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'eshop@kupelecks.sk',
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola zrušená', // Subject line
        html: orderSendMailToSend, // html body
      });

      console.log('Message sent: %s', info.messageId);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export default async (
  root: any,
  args: {
    _id: string;
    status: number;
  },
  ctx: any
): Promise<IOrder> => {
  try {
    const { _id, status } = args;
    const serviceExist: IOrder = await Order.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!serviceExist) {
      throw new ModError(404, 'Service not exist');
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(_id),
      },
      {
        $set: { status },
      },
      { new: true }
    );

    const { __v, ...result } = updatedOrder.toObject();

    if (status === 1) {
      await sendMailNotificationOrderSend(
        'info@codebrothers.sk',
        result.email,
        result
      );
    }
    if (status === 2) {
      let invoiceId: string = '';
      if (result.invoiceId !== undefined) {
        invoiceId = result.invoiceId;
      } else {
        invoiceId = await calculateInvoiceId();
      }

      await Order.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(_id),
        },
        {
          $set: { invoiceId: invoiceId },
        },
        { new: true }
      );

      const filteredProducts = result.products.filter(
        (product) => product.variant !== undefined
      );

      const isDeliveryAddress = result.optionalAddress !== '';
      const isCompany = result.companyName !== '';
      let totalPriceWithoutVat = result.totalPrice / 1.2;
      totalPriceWithoutVat = Math.round(totalPriceWithoutVat * 100) / 100;
      let totalPriceVat = result.totalPrice - result.totalPrice / 1.2;
      totalPriceVat = Math.round(totalPriceVat * 100) / 100;
      const createdAt = new Date().toLocaleDateString('sk-SK');

      const readyData = {
        ...result,
        products: filteredProducts,
        isDeliveryAddress: isDeliveryAddress,
        isCompany: isCompany,
        totalPriceWithoutVat: formatPrice(totalPriceWithoutVat),
        totalPriceVat: formatPrice(totalPriceVat),
        totalPrice: formatPrice(result.totalPrice),
        createdAt: createdAt,
        invoiceId: invoiceId,
      };

      readyData.products.forEach((product, index) => {
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
          product.totalPriceWithoutVat = formatPrice(
            product.totalPriceWithoutVat
          );
          product.productNumber = index + 1;
        }
      });

      const giftCards = result.products.filter(
        (product) => product.variant === undefined
      );

      giftCards.forEach((card, index) => {
        card.totalPrice = Math.round(card.totalPrice * 100) / 100;
        card.totalPriceWithoutVat = card.totalPrice / 1.2;
        card.totalPriceWithoutVat =
          Math.round(card.totalPriceWithoutVat * 100) / 100;
        card.totalPriceVat = card.totalPrice - card.totalPrice / 1.2;
        card.totalPriceVat = Math.round(card.totalPriceVat * 100) / 100;
        card.totalPrice = formatPrice(card.totalPrice);
        card.totalPriceWithoutVat = formatPrice(card.totalPriceWithoutVat);
        card.totalPriceVat = formatPrice(card.totalPriceVat);
        card.cardNumber = index + 1;
        card.services.length > 0
          ? (card.areServices = true)
          : (card.areServices = false);
        card.priceValue > 0
          ? (card.isPriceValue = true)
          : (card.isPriceValue = false);
        if (card.services.length > 0) {
          card.services.forEach((service) => {
            service.price = formatPrice(service.price);
          });
        }
        if (card.priceValue > 0) {
          card.priceValue = formatPrice(card.priceValue);
        }
      });

      const pdfData = {
        ...readyData,
        giftCards,
        areProducts: readyData.products.length > 0,
        areGiftCards: giftCards.length > 0,
        isLoyalityProduct: readyData.loyalityProduct ? true : false,
        loyalityProduct: readyData.loyalityProduct,
        deliveryPrice: formatPrice(readyData.deliveryPrice),
        paymentPrice: formatPrice(readyData.paymentPrice),
        isCoupon: readyData.coupon ? true : false,
      };

      const document = {
        html: invoice_pdf,
        data: pdfData,
        path: path.join(
          __dirname,
          `../../../../../../static/invoice/invoice-${invoiceId}.pdf`
        ),
      };
      await pdf.create(document);
      await sendMailNotificationOrderSolved(
        'info@codebrothers.sk',
        readyData.email,
        readyData
      );
    }
    if (status === 3) {
      await sendMailNotificationOrderCanceled(
        'info@codebrothers.sk',
        result.email,
        result
      );
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
