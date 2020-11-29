import { Request, Response, NextFunction } from 'express';
import Customer, { ICustomer } from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import TokenSchema, { ITokenSchema } from '../../db/models/TokenSchema';

const mailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465, // 587,
  secure: true, // true, // ssl
  auth: {
    user: process.env.EMAIL_LOGIN, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

export const resendRoute: (req: Request, res: Response, next: NextFunction) => void = async (req, res, next) => {
  const { body: { email } } = req;
  const domain: string =
    process.env.NODE_ENV === 'production'
      ? 'eshop.kupelecks.sk'
      : 'localhost:3016';

  const customer: ICustomer = await Customer.findOne({ email });

  if (!customer) {
    return res.status(404)
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
  
    const mailOptions = {
      from: 'eshop@kupelecks.sk',
      to: email,
      subject: 'Potvrdenie registrácie účtu',
      text:
        'Dobrý deň,\n\n' +
        'prosím verifikujte svoj účet kliknutím na adresu: \nhttp://' +
        domain +
        '/confirmation/?token=' +
        token.token +
        '.\n',
    };
  
    await mailTransporter.sendMail(mailOptions);

    res.send('A verification email has been sent to ' + email + '.');
  } catch (error) {
    return next(error);
  };
};
