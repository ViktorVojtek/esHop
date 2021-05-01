const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import { Request, Response, NextFunction } from 'express';
import Customer, { ICustomer } from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { config } from '../../config';

var reset_password_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../public/html/resetPassword/reset_password.html`
  ),
  'utf8'
);

export const resetPasswordRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mailer } = config;
  const { email } = req.body;
  const domain: string =
    process.env.NODE_ENV === 'production'
      ? 'eshop.kupelecks.sk'
      : 'localhost:3016';

  const customer: ICustomer = await Customer.findOne({ email });

  if (!customer) {
    return res
      .status(404)
      .send({ msg: 'We were unable to find a user for this token.' });
  }

  const mailTransporter = nodemailer.createTransport({
    host: mailer.host,
    port: mailer.port,
    secure: mailer.secure,
    auth: {
      user: mailer.auth.user,
      pass: mailer.auth.pass,
    },
  });

  const oneDay: number = 24 * 60 * 60 * 1000;
  const date: number = Date.now() + oneDay;
  const token: string = crypto.randomBytes(16).toString('hex');

  customer.resetPasswordToken = token;
  customer.resetPasswordExpires = new Date(date);

  try {
    await customer.save();

    // Send the email
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465, // 587,
      secure: true, // true, // ssl
      auth: {
        user: process.env.EMAIL_LOGIN, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });

    const templateResetPasswordMail = handlebars.compile(reset_password_html);
    var replacement = {
      url: `http://${domain}/change-password/?token=${token}`,
    };

    const resetPasswordMailToSend = templateResetPasswordMail(replacement);

    // send mail with defined transport object
    transporter.sendMail({
      from: '"Eshop KúpeleCKS" <eshop@kupelecks.sk>',
      to: email, // list of receivers
      subject: 'Červený Kláštor | Zmena hesla', // Subject line
      html: resetPasswordMailToSend, // html body
    });

    res.send('A reset password email has been sent to ' + email + '.');
  } catch (error) {
    return next(error);
  }
};
