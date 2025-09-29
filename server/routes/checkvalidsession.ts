import { type Request, Router } from "express";
import { prisma } from "../lib/prisma";
import { cookieSchema } from "../schemas/cookie.schema";
import { isProd } from "../lib/config";

const router = Router()

router.get('/', async (req: Request, res: any) => {
  const cookieString = isProd ? '__Secure-better-auth.session_token' : 'better-auth.session_token'
  const fullCookie = req?.cookies[cookieString];

  if (!fullCookie) {
    return res.json({
      success: false,
      message: 'Auth Cookie was not sent to the server by client'
    });
  }

  const {success, data, error} = cookieSchema.safeParse(fullCookie)

  if (!success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Auth Cookie',
      error: error.issues[0]
    })
  }

  try {
    const cookie: string = data.split('.')[0];

    const valid = await prisma.session.findUnique({
      where: { token: cookie },
      select: {
        user: {
          select: {
            name: true
          },
        },
      },

    });

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: 'Session not found'
      });
    }

    const name = valid?.user.name.split(' ')[0]

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
});

export default router