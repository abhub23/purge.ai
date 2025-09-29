import {Router} from "express";
import type { Request } from "express";
import razorpayInstance from "../lib/razorpay";
import { validSession } from "../middlewares/validSession";
import { OrderSchema } from "../schemas/payment.schema";


const router = Router()

router.post('/', validSession, async (req: Request, res: any) => {
    const {success, data, error} = OrderSchema.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            success: false,
            message: error.issues[0].message
        })
    }
    
    try {
        const { price } = data
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