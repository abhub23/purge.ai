import express from 'express';
import crypto from 'crypto';
import { validSession } from '../middlewares/validSession';

const router = express.Router();
router.use(validSession)

router.post('/', (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // Payment verified
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false, msg: 'Invalid signature' });
  }
});

export default router;
