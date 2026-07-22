import { Router } from 'express';
import { validSession } from '../../middlewares/validSession.js';
import { verifyPayment } from './verify-payment.controller.js';

const router = Router();
router.use(validSession);

router.post('/', verifyPayment);

export default router;
