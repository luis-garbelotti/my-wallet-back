import db from "../database.js";

export async function validateToken(req, res, next) {

    try {

        const authorization = req.headers.authorization;
        const token = authorization?.replace('Bearer ', '');

        if (!token) {
            return res.sendStatus(401);
        }

        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({ _id: session.userId });

        if (!user) {
            return res.sendStatus(401);
        }

        delete user.password;

        res.locals.user = user;

        next();

    } catch (error) {
        res.sendStatus(500);
    }

}