import express from "express";
import type { Request } from "express";
import razorpayInstance from "../lib/razorpay";
import { validSession } from "../middlewares/validSession";


const router = express.Router()

router.post('/', validSession, async (req: Request, res: any) => {
    
    try {
        const { amount } = req.body;
        console.log(amount)
        const options = {
            amount: amount * 86 * 100, // dollar price * paise
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`
        }
        const order = await razorpayInstance.orders.create(options)
        return res.status(200).json({
            order,
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            message: 'error in creating order',
            success: false
        })
    }

})

export default router