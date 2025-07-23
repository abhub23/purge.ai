/** @ts-ignore */

export const validSession = (req, res, next) => {
    const cookie = req.cookies['better-auth.session_token'];
  
    if (!cookie) {
      return res.status(401).json({
        message: 'Invalid Session',
        success: false
      });
    }
  
    next();
  };
  