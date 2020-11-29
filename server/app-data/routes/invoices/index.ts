import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../../db/models/Order';

export const invoiceRoute: (req: Request, res: Response, next: NextFunction) => Promise<any> = async (req, res, next: NextFunction) => {
  const { originalUrl, query } = req;
  const url: string = originalUrl;
  const { admin, user } = query;
  const invoiceId: string = url.substring(url.indexOf('-') + 1, url.indexOf('.pdf'));

  if (user) {
    const order: IOrder = await Order.findOne({ invoiceId });

    if (!order) {
      return res.redirect('/404');
    }

    const { userId } = order;

    if (userId === user) {
      return next();
    } else {
      return res.redirect('/404');
    }
  } else if (admin) {
    return next();
  } else {
    return res.redirect('/404');
  }
};
