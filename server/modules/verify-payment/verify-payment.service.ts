import crypto from 'crypto';
import type { VerifyPaymentDTO } from './verify-payment.schema.js';

export function generateSignature({razorpay_order_id, razorpay_payment_id, razorpay_signature}: VerifyPaymentDTO){
 const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

      return signature
}