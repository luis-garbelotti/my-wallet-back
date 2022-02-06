import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import validateTransactionMiddleware from '../middlewares/validateTransactionMiddleware.js';
import validateUpdateMiddleware from '../middlewares/validateUpdateMiddleware.js';
import { transactionHistory, deposit, payment, updateDeposit, updatePayment, deleteTransaction } from '../controllers/transactionController.js';

const transactionRouter = Router();

transactionRouter.get('/historic', validateToken, transactionHistory)
transactionRouter.post('/deposit', validateTransactionMiddleware, deposit)
transactionRouter.post('/payment', validateTransactionMiddleware, payment)
transactionRouter.put('/update-deposit/:idTransaction', validateUpdateMiddleware, validateToken, updateDeposit)
transactionRouter.put('/update-payment/:idTransaction', validateUpdateMiddleware, validateToken, updatePayment)
transactionRouter.delete('/historic/:idTransaction', validateToken, deleteTransaction)

export default transactionRouter;