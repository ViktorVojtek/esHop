import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../../db/models/Order';

export const orderRoute: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
  const { originalUrl, query } = req;
  const url: string = originalUrl;
  const orderId: string = url.substring(url.indexOf('-') + 1, url.indexOf('.pdf'));
  const { admin, user } = query;

  try {
    if (user) {
      const order: IOrder = await Order.findOne({ orderId: orderId });

      if (!order) {
        return res.redirect('/404');
      }

      const { userId } = order;

      if(userId === user) {
        return next();
      } else {
        return res.redirect('/404');
      }
    } else if (admin) {
      return next();
    } else {
      return res.redirect('/404');
    }
  } catch (error) {
    return next(error);
  }
};
