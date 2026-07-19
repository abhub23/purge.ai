import { Router } from 'express';
import { checkCredits } from '../../middlewares/checkCredits.js';
import { handleChat } from './chat.controller.js';

const router = Router();
router.use(checkCredits);

router.post('/', handleChat);

export default router;
