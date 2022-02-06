import transactionSchema from "../schemas/transactionSchema.js";

export default function validateTransactionMiddleware(req, res, next) {
    const validation = transactionSchema.validate(req.body);

    if (validation.error) {
        res.sendStatus(422);
    }

    next();
}