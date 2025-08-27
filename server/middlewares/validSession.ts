import { isProd } from "../lib/config";

/** @ts-ignore */
export const validSession = (req, res, next) => {
  const cookieString = isProd ? '__Secure-better-auth.session_token' : 'better-auth.session_token'
  const fullCookie = req?.cookies[cookieString]; 

    if (!fullCookie) {
      return res.status(401).json({
        message: 'Invalid Session',
        success: false
      });
    }
  
    next();
  };
  