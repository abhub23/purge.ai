import { Router } from 'express';
import { validSession } from '../../middlewares/validSession';
import { handleOrderPay } from './order-pay.controller';

const router = Router();

router.post('/', validSession, handleOrderPay);

export default router;
