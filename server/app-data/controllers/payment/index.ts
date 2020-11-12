import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../../config';
import { calculateOrderId } from '../../graphql/resolvers/utils';

export default async (
  orderData: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    gp: { ClientID, StoreKey },
  } = config;
  const orderId: string = await calculateOrderId();
  const amount: number = orderData.totalPrice; // total sum of transaction
  const currency: number = 978;
  const oid: string = orderId; // unique identifier of order
  const okUrl: string = 'https://eshop.kupelecks.sk/uspesna-platba';
  const failUrl: string = 'https://eshop.kupelecks.sk/neuspesna-platba';
  const tranType: string = 'Auth';

  const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||asdf||||${currency}|${StoreKey}`;

  const hash = crypto.createHash('sha512');
  const hashedData = hash.update(plainText);
  const genHash = hashedData.digest('base64');
  //const base64 = Buffer.from(genHash).toString('base64');

  const data = {
    clientid: ClientID,
    storetype: '3d_pay_hosting',
    hash: `${genHash}`,
    trantype: `${tranType}`,
    amount: `${amount}`,
    currency: `${currency}`,
    oid: orderId,
    okUrl: okUrl,
    failUrl: failUrl,
    lang: 'sk',
    rnd: 'asdf',
    hashAlgorithm: 'ver2',
    encoding: 'utf-8',
  };
  try {
    console.log(data);
    res.json(data);
  } catch (err) {
    next(err);
  }
  /*try {
    const response = await fetch(
      'https://testsecurepay.eway2pay.com/fim/est3dgate',
      {
        body: formBody.join('&'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 'application/json',
        },
        method: 'POST',
      }
    );
    const respJson = await response.text();

    console.log('\n');
    console.log(response);

    //res.json({ message: respJson });
  } catch (err) {
    next(err);
  }*/
};
