import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { config } from '../../config';
import { calculateOrderId } from '../../graphql/resolvers/utils';

var nodeNestpay = require('node-nestpay');

export default async (
  orderData: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    gp: { ClientID, ClientName, ClientPass, StoreKey },
  } = config;
  const orderId: string = await calculateOrderId();
  const amount: number = orderData.totalPrice; // total sum of transaction
  const currency: number = 978;
  const oid: string = orderId; // unique identifier of order
  const okUrl: string =
    'https://eshop.kupelecks.sk/eshop/cart/uspesna-objednavka';
  const failUrl: string =
    'https://eshop.kupelecks.sk/eshop/cart/neuspesna-objednavka';
  const tranType: string = 'Auth';

  const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||"asdf"||||${currency}|${StoreKey}|`;

  console.log(plainText);

  const hash = crypto.createHash('sha512');
  const hashedData = hash.update(plainText);
  const genHash = hashedData.digest('hex');
  const base64 = Buffer.from(genHash).toString('base64');

  console.log(base64);

  //const base64Buff: Buffer = Buffer.from(genHash, 'base64');
  //const base64 = base64Buff.toString('base64');

  // console.log(base64);

  const data = {
    clientid: ClientID,
    storetype: '3D_PAY_HOSTING',
    hash: base64,
    trantype: tranType,
    amount,
    currency: currency,
    oid: orderId,
    okUrl,
    failUrl,
    lang: 'sk',
    rnd: 'asdf',
    hashAlgorithm: 'ver2',
    encoding: 'utf-8',
  };

  console.log(data);

  try {
    const response = await fetch(
      'https://testsecurepay.eway2pay.com/fim/est3dgate',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 'application/json',
        },
        method: 'POST',
      }
    );
    const respJson = await response.text();

    console.log('\n');
    console.log(respJson);

    res.json({ message: respJson });
  } catch (err) {
    next(err);
  }
};
