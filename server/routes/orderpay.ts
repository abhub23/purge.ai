import express from "express";
import type { Request } from "express";
import razorpayInstance from "../lib/razorpay";
import { validSession } from "../middlewares/validSession";
import { OrderSchema } from "../schemas/payment.schema";


const router = express.Router()

router.post('/', validSession, async (req: Request, res: any) => {
    const result = OrderSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            success: false,
            msg: result.error.issues[0].message
        })
    }
    
    try {
        const { plan_id, price } = result.data
        const options = {
            amount: price * 86 * 100, // USD -> INR paise
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
            success: false,
            message: 'error in creating order'
        })
    }

})

export default router