import { Router } from "express";
import { isProd } from "../lib/config";
import {prisma} from '../lib/prisma'

const router = Router()

router.get('/', (req, res) => {
    const cookieString = isProd ? '__Secure-better-auth.session_token' : 'better-auth.session_token'
    const fullCookie = req?.cookies[cookieString];

    try {
        if (!fullCookie) {
            const userIP = req.ip


            
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'cdc'
        })
    }
})