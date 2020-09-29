const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';
import { calculateOrderId } from '../../utils';

// from: '"Fred Foo 👻" <foo@example.com>'
// to: "bar@example.com, baz@example.com",
var html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/invoiceTemplate/template.html`
  ),
  'utf8'
);

function sendMailNotification(from: string, to: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola prijatá', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
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

  updatedData.products.forEach((product) => {
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

  await sendMailNotification('info@codebrothers.sk', updatedData.email);

  const { userId } = updatedData;

  if (userId) {
    const customerExist: ICustomer = await Customer.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });

    console.log(customerExist);

    /* if (!customerExist) {
      throw new ModError(404, 'Customer does not exist');
    } */

    const custData = customerExist.toObject();
    const updatedCustData = {
      ...custData,
      customerPoints: custData.customerPoints + 10,
    };

    await Customer.findByIdAndUpdate(userId, updatedCustData);
  }

  // const { __v, ...result } = newOrder.toObject();

  return 'Order has been created.';
};

export default createOrder;
