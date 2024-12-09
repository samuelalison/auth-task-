import { Router } from 'express';
import authController from './auth.controller';

const router = Router();

router.get('/oauth/:provider', authController.getAuth);

export default router;