import { type Request, type Response } from "express";

export function getLiveness(_req: Request, res: Response){
    res.status(200).json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    })
} 

export function getReadiness(_req: Request, res: Response){
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date()
    })
} 

