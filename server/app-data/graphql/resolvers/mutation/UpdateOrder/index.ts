const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Order, { IOrder } from '../../../../db/models/Order';
// import { storeFile } from '../../utils';
import ModError from '../../utils/error';

var order_send_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderSendTemplate/order_sent.html`
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
  orderData: any,
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
        orderId: orderData.orderId
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

function sendMailNotificationOrderCanceled(
  from: string,
  to: string,
  orderData: any,
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
        orderId: orderData.orderId
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

    if(status === 1){
      await sendMailNotificationOrderSend(
        'info@codebrothers.sk',
        result.email,
        result
      );
    }
    if(status === 3){
      await sendMailNotificationOrderCanceled(
        'info@codebrothers.sk',
        result.email,
        result,
      );
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
