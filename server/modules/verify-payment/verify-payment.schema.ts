import { z } from "zod";

export const VerifyPaymentSchema = z.object({
    razorpay_order_id: z.string().regex(/^order_\w+$/, "Invalid order ID"),
    razorpay_payment_id: z.string().regex(/^pay_\w+$/, "Invalid payment ID"),
    razorpay_signature: z.string().min(1, "Signature is required"),
})

export type VerifyPaymentDTO = z.infer<typeof VerifyPaymentSchema>