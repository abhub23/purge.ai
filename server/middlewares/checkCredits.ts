import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export const checkCredits = async (req: any, res: any, next: NextFunction): Promise<void> => {
    const fullCookie = req?.cookies['better-auth.session_token'];
    const userIP = req.ip

    try {
        if (!fullCookie) {
            const findUser = await prisma.tempUsers.findFirst({
                where: {
                    ipAddress: userIP
                }
            })

            if (!findUser) {
                const newUser = await prisma.tempUsers.create({
                    data: {
                        ipAddress: userIP,
                        expiresAt: new Date(Date.now() + 604800000) // 7 days
                    }
                })
                req.guestUser = newUser
                return next()
            }

            if (findUser?.credits as number <= 0) {
                return res.json({
                    message: 'You Dont have enough credits',
                    success: false
                })
            }

            req.guestUser = findUser //Unsigned users
            return next()

        }

        const cookie = fullCookie?.split('.')[0];

        const session = await prisma.session.findUnique({
            where: { token: cookie },
            select: {
                user: {
                    select: {
                        id: true,
                        plans: {
                            where: {
                                credits: { gt: 0 },
                                expiresAt: { gt: new Date() }, // optional
                            },
                        },
                    },
                },
            },
        });



        if (!session || !session.user) {
            return res.status(401).json({ message: "Invalid session" });
        }

        // session.user.plans will only contain plans with credits > 0
        if (session.user.plans.length === 0) {
            return res.status(403).json({ message: "Not enough credits", success: false });
        }

        req.authUser = session.user; //Signed users

        return next();
    } catch (error) {
        console.error("Error checking credits:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
        return
    }
};

