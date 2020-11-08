import { Request, Response, NextFunction } from 'express';
import Order from '../../db/models/Order';
export default async (req: Request, res: Response, next: NextFunction) => {
  var url = req.originalUrl;
  var invoiceId = url.substring(url.indexOf('-') + 1, url.indexOf('.pdf'));

  if (req.query.user) {
    Order.findOne({ invoiceId: invoiceId }, function (err, order) {
      if (!order) {
        return res.redirect('/404');
      }
      if (order.userId === req.query.user) {
        return next();
      } else {
        return res.redirect('/404');
      }
    });
  } else if (req.query.admin) {
    return next();
  } else return res.redirect('/404');
};
