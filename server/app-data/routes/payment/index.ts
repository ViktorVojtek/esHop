import { NextFunction, Request, Response } from 'express';
import paymentController from '../../controllers/payment';

export const paymentRoute: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
  const cartData = req.body;
  
  paymentController(cartData, req, res, next);
};
