import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import Customer, { ICustomer } from '../../db/models/Customer';
import Order, { IOrder } from '../../db/models/Order';

const pathUrl = path.join(__dirname, '../../../../static/orders');

export const orderRoute: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> = async (req, res, next) => {
  const { originalUrl, query } = req;
  const url: string = originalUrl;
  const orderId: string = url.substring(
    url.indexOf('-') + 1,
    url.indexOf('.pdf')
  );
  const { admin, user } = query;

  try {
    if (user) {
      const order: IOrder = await Order.findOne({ orderId: orderId });

      if (!order) {
        return res.redirect('/404');
      }
      const { email } = order;
      const customer: ICustomer = await Customer.findOne({
        _id: mongoose.Types.ObjectId(user as string),
      });

      if (!customer) {
        return res.redirect('/404');
      }

      if (email === customer.email) {
        return send();
      } else {
        return res.redirect('/404');
      }
    } else if (admin) {
      return send();
    } else {
      return res.redirect('/404');
    }
  } catch (error) {
    return next(error);
  }

  function send() {
    res.sendFile(`order-${orderId}.pdf`, {
      root: pathUrl,
    });
  }
};
