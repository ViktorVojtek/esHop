import { Request, Response } from 'express';
import Customer from '../../db/models/Customer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import TokenSchema from '../../db/models/TokenSchema';

export default async (req: Request, res: Response) => {
  console.log(req.body.email);

  const domain: string =
    process.env.NODE_ENV === 'production'
      ? 'eshop.kupelecks.sk'
      : 'localhost:3016';

  Customer.findOne({ email: req.body.email }, function (err, user) {
    console.log(user);
    if (!user) {
      console.log('user neexistuje');
      return res
        .status(404)
        .send({ msg: 'We were unable to find a user for this token.' });
    }
    if (user.isVerified)
      return res.status(409).send({
        type: 'already-verified',
        msg: 'This user has already been verified.',
      });

    const token = new TokenSchema({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    token.save(function (err) {
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
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send('A verification email has been sent to ' + user.email + '.');
      });
    });
  });
};
