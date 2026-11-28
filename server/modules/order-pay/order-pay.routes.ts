import { Router } from 'express';
import { validSession } from '../../middlewares/validSession.js';
import { handleOrderPay } from './order-pay.controller.js';

const router = Router();

router.post('/', validSession, handleOrderPay);

export default router;
