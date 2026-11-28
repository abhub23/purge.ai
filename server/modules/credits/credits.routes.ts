import { Router } from 'express';
import { getCredits } from './credits.controller.js';

const router = Router();

router.get('/', getCredits);

export default router;
