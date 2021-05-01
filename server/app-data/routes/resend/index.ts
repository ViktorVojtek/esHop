const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import { Request, Response, NextFunction } from 'express';
import Customer, { ICustomer } from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import TokenSchema, { ITokenSchema } from '../../db/models/TokenSchema';

var verification_user_html = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../public/html/verificationTemplate/verification_user.html`
  ),
  'utf8'
);

export const resendRoute: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = async (req, res, next) => {
  const {
    body: { email },
  } = req;
  const domain: string =
    process.env.NODE_ENV === 'production'
      ? 'eshop.kupelecks.sk'
      : 'localhost:3016';

  const customer: ICustomer = await Customer.findOne({ email });

  if (!customer) {
    return res
      .status(404)
      .json({ msg: 'We were unable to find a user for this token.' });
  }

  const { _id, isVerified } = customer;

  if (isVerified) {
    return res.status(409).json({
      type: 'already-verified',
      msg: 'This user has already been verified.',
    });
  }

  try {
    const token: ITokenSchema = new TokenSchema({
      _userId: _id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    await token.save();

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

    const templateVerificationMail = handlebars.compile(verification_user_html);
    var replacement = {
      url: `http://${domain}/confirmation/?token=${token.token}`,
    };

    const verificationUserMailToSend = templateVerificationMail(replacement);

    // send mail with defined transport object
    transporter.sendMail({
      from: '"Eshop KúpeleCKS" <eshop@kupelecks.sk>',
      to: email, // list of receivers
      subject: 'Červený Kláštor | Potvrdenie registrácie účtu', // Subject line
      html: verificationUserMailToSend, // html body
    });

    res.send('A verification email has been sent to ' + email + '.');
  } catch (error) {
    return next(error);
  }
};
