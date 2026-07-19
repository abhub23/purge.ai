import { type Request, type Response } from 'express';
import { isProd } from '../../lib/config.js';

export const getCredits = async (req: Request, res: Response) => {
  const cookieString = isProd ? '__Secure-better-auth.session_token' : 'better-auth.session_token';
  const fullCookie = req?.cookies[cookieString];

  try {
    if (!fullCookie) {
      const userIP = req.ip;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
