import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../lib/errors.js';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
};
