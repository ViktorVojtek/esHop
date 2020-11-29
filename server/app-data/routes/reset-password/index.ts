import { Request, Response, NextFunction } from 'express';
import Customer, { ICustomer } from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { config } from '../../config';

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

  console.log(mailTransporter);

  const oneDay: number = 24 * 60 * 60 * 1000;
  const date: number = Date.now() + oneDay;
  const token: string = crypto.randomBytes(16).toString('hex');

  customer.resetPasswordToken = token;
  customer.resetPasswordExpires = new Date(date);

  try {
    await customer.save();

    const mailOptions = {
      from: 'eshop@kupelecks.sk',
      to: email,
      subject: 'Žiadosť o zmenu hesla',
      text:
        'Dobrý deň,\n\n' +
        'požiadali ste o obnovu hesla. Nové heslo si nastavíte kliknutím na adresu: \nhttp://' +
        domain +
        '/change-password/?token=' +
        token +
        '.\n',
    };

    await mailTransporter.sendMail(mailOptions);

    res.send('A reset password email has been sent to ' + email + '.');
  } catch (error) {
    return next(error);
  }
};
