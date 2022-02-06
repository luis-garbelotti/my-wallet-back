import registerSchema from "../schemas/registerSchema.js";

export default function validateRegisterMiddleware(req, res, next) {
    const validation = registerSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}