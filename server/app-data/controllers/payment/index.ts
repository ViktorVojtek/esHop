import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { config } from '../../config';
import { calculateOrderId } from '../../graphql/resolvers/utils';

var nodeNestpay = require('node-nestpay');

export default async (orderData: any, req: Request, res: Response, next: NextFunction) => {
  const {
    gp: { ClientID, ClientName, ClientPass, StoreKey },
  } = config;
  const orderId: string = await calculateOrderId();
  const amount: number = orderData.totalPrice; // total sum of transaction
  const currency: number = 978;
  const oid: string = orderId; // unique identifier of order
  const okUrl: string = 'http://localhost:3016/payment/success';
  const failUrl: string = 'http://localhost:3016/payment/error';
  const tranType: string = 'Auth';

  const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||||${currency}|${StoreKey}`;

  const hash = crypto.createHash('sha512');

  const hashedData = hash.update(plainText);
  const genHash = hashedData.digest('hex');

  const base64 = Buffer.from(genHash).toString('base64');

  //const base64Buff: Buffer = Buffer.from(genHash, 'base64');
  //const base64 = base64Buff.toString('base64');

  // console.log(base64);

  const data = {
    clientid: ClientID,
    storetype: '3d_pay_hosting',
    hash: base64,
    amount,
    currency: currency,
    oid: orderId,
    okUrl,
    failUrl,
    lang: 'sk',
    encoding: 'utf-8',
  };

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
  
    console.log(response);
    /*const nestpay = new nodeNestpay({
      name: '',
      password: '',
      clientId: ClientID,
      storekey: '3d_pay_hosting',
      callbackSuccess: okUrl,
      callbackFail: failUrl,
      currency: currency,
      orderId: orderId,
      endpoint: 'asseco',
    }) as any;
  
    console.log(nestpay);*/
    const respJson = await response.text();

    console.log('\n');
    console.log(respJson);

    res.json({ message: respJson });
  } catch (err) { next(err); }
};
