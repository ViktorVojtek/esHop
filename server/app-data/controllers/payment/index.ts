import { NextFunction } from 'express';
import mongoose from 'mongoose';
import * as nodeNestpay from 'node-nestpay';
import { config } from '../../config';
import order, { IOrder } from '../../db/models/Order';
import { calculateOrderId } from '../../graphql/resolvers/utils';

export default async (orderData: any, next: NextFunction) => {
  const { gp: { ClientID, ClientName, ClientPass, StoreKey } } = config;
  const orderId: string = await calculateOrderId();
  const amount: number = orderData.totalPrice; // total sum of transaction
  const currency: number = 978;
  const oid: string = orderId; // unique identifier of order
  const okUrl: string = 'http://localhost:3016/payment/success';
  const failUrl: string = 'http://localhost:3016/payment/error';
  const tranType: string = 'Auth';
  
  const plainText = `${ClientID}|${oid}|${amount}|${okUrl}|${failUrl}|${tranType}||||${currency}|${StoreKey}`;

  console.log(plainText);
  /* const nestpay = new nodeNestpay({
    name: '',
    password: '',
    clientId: ClientID
  }) as any; */
  next();
};
