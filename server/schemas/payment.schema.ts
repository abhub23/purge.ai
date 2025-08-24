import { z } from "zod";

export const OrderSchema = z.object({
  plan_id: z.literal('pro', { message: "Plan must be 'pro' only" }),
  price: z.number("price must be a number").refine(val => [6,8].includes(val), {message: 'The price is either $6 or $8'} )
});


export const VerifyPaymentSchema = z.object({
    razorpay_order_id: z.string().regex(/^order_\w+$/, "Invalid order ID"),
    razorpay_payment_id: z.string().regex(/^pay_\w+$/, "Invalid payment ID"),
    razorpay_signature: z.string().min(1, "Signature is required"),
})