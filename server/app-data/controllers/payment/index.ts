import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../../config';
import Order from '../../db/models/Order';
import mongoose from 'mongoose';

export default async (
  orderData: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    gp: { ClientID, StoreKey },
  } = config;
  const findOrder = await Order.findOne({
    _id: mongoose.Types.ObjectId(orderData.orderId),
  });

  const { __v, ...result } = findOrder.toObject();
  const orderId: string = result.orderId;
  const amount: number = orderData.totalPrice; // total sum of transaction
  const currency: number = 978;
  const oid: string = orderId; // unique identifier of order
  const okUrl: string =
    'https://eshop.kupelecks.sk/eshop/cart/uspesna-objednavka';
  const failUrl: string =
    'https://eshop.kupelecks.sk/eshop/cart/neuspesna-objednavka';
  const tranType: string = 'Auth';

  const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||asdf||||${currency}|${StoreKey}`;

  const hash = crypto.createHash('sha512');
  const hashedData = hash.update(plainText);
  const genHash = hashedData.digest('base64');

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
    res.json(data);
  } catch (err) {
    next(err);
  }
};
