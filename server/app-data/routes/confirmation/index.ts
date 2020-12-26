import { Request, Response } from 'express';
import Customer from '../../db/models/Customer';
import TokenSchema from '../../db/models/TokenSchema';

export const confirmationRoute = (req: Request, res: Response) => {
  TokenSchema.findOne({ token: req.query.token.toString() }, function (
    err,
    token
  ) {
    if (!token)
      return res
        .status(400)
        .redirect('/verifikacia-uctu?message=neplatny-token');

    // If we found a token, find a matching user
    Customer.findOne({ _id: token._userId }, function (err, user) {
      if (!user)
        return res
          .status(400)
          .redirect('/verifikacia-uctu?message=pouzivatel-neexistuje');
      if (user.isVerified)
        return res
          .status(400)
          .redirect('/verifikacia-uctu?message=verifikovany-pouzivatel');

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).redirect('/moja-zona/prihlasenie?verification=success');
      });
    });
  });
};
