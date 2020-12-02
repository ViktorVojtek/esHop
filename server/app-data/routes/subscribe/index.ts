import { Request, Response, NextFunction } from 'express';
import { config } from '../../config';

export const subscribeRoute: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> = async (req, res, next) => {
  const {
    body: { email, fname, lname, tel },
  } = req;

  const { mailchimp } = config;

  try {
    const API_KEY = mailchimp.secret;
    const LIST_ID = '447d8cc287';
    const DATACENTER = API_KEY.split('-')[1];
    console.log({ API_KEY, LIST_ID, DATACENTER });

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
