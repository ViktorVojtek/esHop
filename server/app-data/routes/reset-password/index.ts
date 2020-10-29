import { Request, Response } from 'express';
import Customer from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default async (req: Request, res: Response) => {
  console.log(req.body.email);

  const domain: string =
    process.env.NODE_ENV === 'production'
      ? 'eshop.kupelecks.sk'
      : 'localhost:3016';

  Customer.findOne({ email: req.body.email }, function (err, user) {
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .send({ msg: 'We were unable to find a user for this token.' });
    }

    const date = Date.now() + 86400000;
    const token = crypto.randomBytes(16).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(date);

    user.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
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
        to: user.email,
        subject: 'Žiadosť o zmenu hesla',
        text:
          'Dobrý deň,\n\n' +
          'požiadali ste o obnovu hesla. Nové heslo si nastavíte kliknutím na adresu: \nhttp://' +
          domain +
          '/change-password/?token=' +
          user.resetPasswordToken +
          '.\n',
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send('A reset password email has been sent to ' + user.email + '.');
      });
    });
  });
};
