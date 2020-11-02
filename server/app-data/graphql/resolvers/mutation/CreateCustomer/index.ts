import bcrypt from 'bcryptjs';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import TokenSchema from '../../../../db/models/TokenSchema';
var os = require('os');

export default async (root: any, args: any, ctx: any) => {
  try {
    const {
      customerData: { email, tel, firstName, lastName, password, role },
    } = args;
    const customerExist = await Customer.findOne({ email });

    if (customerExist) {
      throw new ModError(409, 'Allready exist');
    }

    const domain: string =
      process.env.NODE_ENV === 'production'
        ? 'eshop.kupelecks.sk'
        : 'localhost:3016';

    const hashedPasw = await bcrypt.hash(password, 10);

    const newUserData = {
      email,
      tel,
      firstName,
      lastName,
      password: hashedPasw,
      role,
    };

    const newCustomer = new Customer(newUserData);

    await Customer.create(newCustomer);

    const { __v, ...returnCustomerData } = newCustomer.toObject();

    const token = new TokenSchema({
      _userId: returnCustomerData._id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    token.save(function (err) {
      if (err) {
        return args.status(500).send({ msg: err.message });
      }

      // Send the email
      let transporter = nodemailer.createTransport({
        host: 'smtp.websupport.sk',
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: 'eshop@kupelecks.sk', // generated ethereal user
          pass: 'Cyp147.?riaN20ck12', // generated ethereal password
        },
      });
      var mailOptions = {
        from: 'eshop@kupelecks.sk',
        to: returnCustomerData.email,
        subject: 'Potvrdenie registrácie účtu',
        text:
          'Dobrý deň,\n\n' +
          'prosím verifikujte svoj účet kliknutím na adresu: \nhttp://' +
          domain +
          '/confirmation/?token=' +
          token.token +
          '.\n',
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return args.status(500).send({ msg: err.message });
        }
        args
          .status(200)
          .send(
            'A verification email has been sent to ' +
              returnCustomerData.email +
              '.'
          );
      });
    });

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
