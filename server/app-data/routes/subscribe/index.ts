import { Request, Response, NextFunction } from 'express';
import { config } from '../../config';
import { validateHuman } from '../../graphql/resolvers/utils';
import ModError from '../../graphql/resolvers/utils/error';

export const subscribeRoute: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> = async (req, res, next) => {
  const {
    body: { email, fname, lname, tel, recaptchaToken },
  } = req;

  const { mailchimp } = config;
  if (recaptchaToken) {
    const human = await validateHuman(recaptchaToken);

    if (!human) {
      throw new ModError(400, 'You are robot!');
    }
  }

  try {
    const API_KEY = mailchimp.secret;
    const LIST_ID = '447d8cc287';
    const DATACENTER = API_KEY.split('-')[1];

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
        PHONE: tel,
      },
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error: `Nastala chyba`,
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    return next(error);
  }
};
