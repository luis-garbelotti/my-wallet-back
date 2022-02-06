import { login, register } from '../controllers/authController.js';
import { Router } from 'express';
import validadeLoginMiddleware from '../middlewares/validateLoginMiddleware.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';

const authRouter = Router();

authRouter.post('/', validadeLoginMiddleware, login)
authRouter.post('/register', validateRegisterMiddleware, register)

export default authRouter;