import express, { type Request } from "express";
import { prisma } from "../lib/prisma";
import { cookieSchema } from "../schemas/cookie.schema";

const router = express.Router()

router.get('/', async (req: Request, res: any) => {
  const fullCookie = req.cookies['better-auth.session_token'] as string;

  if (!fullCookie) {
    return res.json({
      success: false,
      message: 'Auth Cookie was not sent to the server by client'
    });
  }

  const parsedCookie = cookieSchema.safeParse(fullCookie)

  if (!parsedCookie.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Auth Cookie',
      error: parsedCookie.error.issues[0]
    })
  }

  try {
    const cookie: string = parsedCookie.data.split('.')[0];

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