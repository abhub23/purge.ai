import { Router } from 'express';
import { checkValidSession } from './check-valid-session.controller';

const router = Router();

router.get('/', checkValidSession);

export default router;
