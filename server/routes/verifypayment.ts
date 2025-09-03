import {Router} from 'express';
import crypto from 'crypto';
import { validSession } from '../middlewares/validSession';
import { VerifyPaymentSchema } from '../schemas/payment.schema';

const router = Router();
router.use(validSession)

router.post('/', (req, res) => {

  const parsedBody = VerifyPaymentSchema.safeParse(req.body)

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: parsedBody.error.issues[0].message
    })
  }
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsedBody.data;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, msg: 'Invalid signature' });
    }
  } catch (error) {
    res.status(400).json({

    })
  }

});

export default router;
