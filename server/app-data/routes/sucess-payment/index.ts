import { Request, Response } from 'express';

export default async (req: Request, res: Response, next) => {
  console.log(res);
  next();
};
