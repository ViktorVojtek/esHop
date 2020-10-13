const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';
import { calculateOrderId } from '../../utils';

const formatPrice = (number: number) => {
  let numberToFormat = number.toFixed(2).toString();
  return numberToFormat.replace('.', ',');
};


// from: '"Fred Foo 👻" <foo@example.com>'
// to: "bar@example.com, baz@example.com",
var html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/invoiceTemplate/template.html`
  ),
  'utf8'
);

const orderCreated = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderTemplate/order_created.html`
  ),
  'utf8'
);

function sendMailNotification(
  from: string,
  to: string,
  orderData: any,
  giftCards: any
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

      const templateOrderMail = handlebars.compile(orderCreated);
      var replacement = {
        orderId: orderData.orderId,
        date: orderData.createdAt,
        name: orderData.firstName,
        surname: orderData.lastName,
        address: orderData.address,
        deliveryAdress: {
          address:
            orderData.optionalAddress != ''
              ? orderData.optionalAddress
              : orderData.address,
          postalCode:
            orderData.optionalAddress != ''
              ? orderData.optionalPostalCode
              : orderData.postalCode,
          city:
            orderData.optionalAddress != ''
              ? orderData.optionalCity
              : orderData.city,
          state:
            orderData.optionalAddress != ''
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
      };

      const orderMailToSend = templateOrderMail(replacement);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'eshop@kupelecks.sk',
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola prijatá', // Subject line
        html: orderMailToSend, // html body
      });

      console.log('Message sent: %s', info.messageId);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

const createOrder: (
  root: any,
  args: any,
  ctx: any,
  orderIdIn?: string
) => Promise<String> = async (root, { data }, ctx, orderIdIn) => {
  let updatedData: any;
  let orderId: string = '';
  let createdAt: string = new Date().toLocaleDateString('sk-SK');
  let totalPriceWithoutVat = 0;
  let totalPriceVat = 0;

  if (!orderIdIn) {
    orderId = await calculateOrderId();
  } else {
    orderId = orderIdIn;
  }

  totalPriceWithoutVat = data.totalPrice / 1.2;
  totalPriceWithoutVat = Math.round(totalPriceWithoutVat * 100) / 100;
  totalPriceVat = data.totalPrice - data.totalPrice / 1.2;
  totalPriceVat = Math.round(totalPriceVat * 100) / 100;

  updatedData = {
    ...data,
    orderId,
    createdAt,
    totalPriceWithoutVat,
    totalPriceVat,
  };

  const newOrder: IOrder = new Order(updatedData);

  await Order.create(newOrder);

  const filteredProducts = updatedData.products.filter(
    (product) => product.variant !== undefined
  );

  const readyData = {
    ...updatedData,
    products: filteredProducts,
  };

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
    }
  });

  const giftCards = updatedData.products.filter(
    (product) => product.variant === undefined
  );

  giftCards.forEach((card) => {
    card.services.length > 0
      ? (card.areServices = true)
      : (card.areServices = false);
  });

  const document = {
    html: html,
    data: updatedData,
    path: path.join(
      __dirname,
      `../../../../../../static/invoices/invoice-${orderId}.pdf`
    ),
  };
  await pdf.create(document);

  await sendMailNotification(
    'info@codebrothers.sk',
    readyData.email,
    readyData,
    giftCards
  );

  const { userId } = readyData;

  if (userId) {
    const customerExist: ICustomer = await Customer.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });

    /* if (!customerExist) {
      throw new ModError(404, 'Customer does not exist');
    } */

    const custData = customerExist.toObject();
    const updatedCustData = {
      ...custData,
      customerPoints: custData.customerPoints + updatedData.totalPrice * 100,
    };

    await Customer.findByIdAndUpdate(userId, updatedCustData);
  }

  // const { __v, ...result } = newOrder.toObject();

  return 'Order has been created.';
};

export default createOrder;
