import { type Request, type Response } from 'express';
import { isProd } from '../../lib/config.js';
import { cookieSchema } from './check-valid-session.schema.js';
import { validateSession } from './check-valid-session.service.js';

export const checkValidSession = async (req: Request, res: Response) => {
  const cookieString = isProd ? '__Secure-better-auth.session_token' : 'better-auth.session_token';
  const fullCookie = req?.cookies[cookieString];

  if (!fullCookie) {
    return res.json({
      success: false,
      message: 'Auth Cookie was not sent to the server by client'
    });
  }

  const { success, data, error } = cookieSchema.safeParse(fullCookie);

  if (!success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Auth Cookie',
      error: error.issues[0]
    });
  }

  try {
    const token = data.split('.')[0];
    const name = await validateSession(token);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Session not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Valid Session token',
      name
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while validating session'
    });
  }
};
