import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../db/models/User';

export const setupRoute: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
  try {
    const user: IUser = await User.findOne({ admin: true, role: 0 });

    if (!user) {
      return next();
    }

    res.redirect('/admin');
  } catch (error) {
    return next(error);
  }
};
