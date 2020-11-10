import { NextFunction, Request, Response } from 'express';
import paymentController from '../../controllers/payment';

export default (req: Request, res: Response, next: NextFunction) => {
  console.log("You've access the payment routes\n");
  const cartData = req.body;
  // console.log(cart);
  console.log('\n');

  paymentController(cartData, next);

  console.log('sucsess');

  // next();
};
