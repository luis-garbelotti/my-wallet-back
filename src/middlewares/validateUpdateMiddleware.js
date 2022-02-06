import updateTransactionSchema from "../schemas/updateTransactionSchema.js";

export default function validateUpdateMiddleware(req, res, next) {
    const validation = updateTransactionSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}