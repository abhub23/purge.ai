import { type Request, type Response } from "express";

// Liveness -> Is the process running ?

export function getLiveness(_req: Request, res: Response){
    res.status(200).json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    })
} 

// Readiness -> Is the App ready to accept HTTP traffic right now ?

export function getReadiness(_req: Request, res: Response){

    const heapUsedMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024)

    res.status(200).json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        checks: {
            app: {
                status: 'ok',
                memoryUsageMB: heapUsedMB
            }
        }
    })
} 

