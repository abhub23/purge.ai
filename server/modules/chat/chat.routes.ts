import { Router } from 'express';
import { requireSession } from '../../middlewares/requireSession.js';
import { handleChat } from './chat.controller.js';

const router = Router();
router.use(requireSession);

router.post('/', handleChat);

export default router;
