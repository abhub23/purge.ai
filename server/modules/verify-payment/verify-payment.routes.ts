import { Router } from 'express';
import { validSession } from '../../middlewares/validSession';
import { verifyPayment } from './verify-payment.controller';

const router = Router();
router.use(validSession);

router.post('/', verifyPayment);

export default router;
