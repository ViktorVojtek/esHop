import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';
import ReactPDF from '@react-pdf/renderer';

// from: '"Fred Foo 👻" <foo@example.com>'
// to: "bar@example.com, baz@example.com",

function sendMailNotification(from: string, to: string) {
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

const createOrder: (root: any, args: any, ctx: any) => Promise<String> = async (
  root,
  { data },
  ctx
) => {
  const newOrder: IOrder = new Order(data);
  console.log(data);

  await Order.create(newOrder);

  await sendMailNotification('info@codebrothers.sk', data.email);

  const { userId } = data;

  if (userId) {
    const customerExist: ICustomer = await Customer.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });

    if (!customerExist) {
      throw new ModError(404, 'Customer does not exist');
    }

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
