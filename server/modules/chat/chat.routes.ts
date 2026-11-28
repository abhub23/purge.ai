import { Router } from 'express';
import { checkCredits } from '../../middlewares/checkCredits';
import { handleChat } from './chat.controller';

const router = Router();
router.use(checkCredits);

router.post('/', handleChat);

export default router;
