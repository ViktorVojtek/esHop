import { NextFunction } from 'express';
import crypto from 'crypto';
import * as nodeNestpay from 'node-nestpay';
import { config } from '../../config';
import { calculateOrderId } from '../../graphql/resolvers/utils';

export default async (orderData: any, next: NextFunction) => {
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
  const hash = crypto.createHmac('sha512', 'key');

  const hashedData = hash.update(plainText);
  const genHash = hashedData.digest('hex');

  const base64Buff: Buffer = Buffer.from(genHash, 'base64');
  const base64 = base64Buff.toString('base64');

  console.log(base64);
  /* const nestpay = new nodeNestpay({
    name: '',
    password: '',
    clientId: ClientID
  }) as any; */
  next();
};
