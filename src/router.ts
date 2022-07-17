import { Request, Response, Router } from 'express';

import { Controller } from './controllers'

const router = Router();

router.post('/auth/register', Controller.auth.handleRegister)
router.post('/auth/login', Controller.auth.handleLogin)

export { router };
