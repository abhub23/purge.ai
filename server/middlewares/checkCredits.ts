import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export const checkCredits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookie = req.cookies['better-auth.session_token'];

    if (!cookie) {
        res.status(401).json({ success: false, error: "Unauthorized access, Cookie not found" });
        return
    }

    try {
        const session = await prisma.session.findFirst({
            where: {
                token: cookie,
                user: {
                    credits: { gt: 0 }
                },
            },
            select: {
                id: true,
            },
        });

        if (!session || !session.id) {
            res.status(401).json({ error: "Insufficient credits, Signin to get more" });
            return;
        }

        next();
    } catch (error) {
        console.error("Error checking credits:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
        return
    }
};

