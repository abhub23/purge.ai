import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
const router = express.Router()

router.get('/checkvalidsession', async (req: Request, res: any) => {
    const cookie = req.cookies['better-auth.session_token'];


    if (!cookie) {
        res.status(401).json({
            message: 'Cookie not found my the server'
        })
        return
    }

    try {
        const valid = await prisma.session.findUnique({
            where: { token: cookie }
        })
        console.log('valid:   ', valid)
        if (!valid) {
            res.status(404).json({
                success: false,
                message: 'Session not found'
            })
            return
        }

        return res.status(200).json({
            success: true,
            message: 'Valid Session token'
        })

    } catch (error) {
        console.error('Error occured finding session', error)
        return
    }

})

export default router