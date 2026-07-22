import type { Request, Response } from 'express';
import { VerifyPaymentSchema } from "./verify-payment.schema";
import { generateSignature } from './verify-payment.service';

export const verifyPayment = async (req: Request, res: Response) => {

    const parsedBody = VerifyPaymentSchema.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
        success: false,
        message: parsedBody.error.issues[0].message
        })
    }

  try {
    const generatedSignature = generateSignature(parsedBody.data)

    if (generatedSignature === parsedBody.data.razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, msg: 'Invalid signature' });
    }
  } catch (error) {
    res.status(400).json({
        success: false,
        message: error
    })
  }

}