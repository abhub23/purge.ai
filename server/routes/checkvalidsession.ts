import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
const router = express.Router()

router.get('/', async (req: Request, res: any) => {
  const fullCookie = req.cookies['better-auth.session_token'];

  if (!fullCookie) {
    return res.json({
      success: false,
      message: 'Cookie not found by the server'
    });
  }

  try {
    const cookie = fullCookie.split('.')[0];

    const valid = await prisma.session.findUnique({
      where: { token: cookie },
      include: {
        user: {
          select: {
            name: true
          },
        },
      },
    });

    const name = valid?.user.name.split(' ')[0]

    if (!valid) {
      return res.status(404).json({
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
    console.error('Error occurred while finding session', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while validating session'
    });
  }
});

export default router