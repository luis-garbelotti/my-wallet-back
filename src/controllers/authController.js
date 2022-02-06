import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database.js';

export async function login(req, res) {

    const { email, password } = req.body;

    try {

        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.collection('sessions').insertOne({ token, userId: user._id });
            delete user.password;
            delete user.email;
            const response = { ...user, token };
            return res.send(response);
        }

        res.sendStatus(401);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function register(req, res) {

    const user = req.body;

    try {

        const passwordHashed = bcrypt.hashSync(user.password, 10);

        const findUser = await db.collection('users').findOne({ email: user.email });

        if (findUser) {
            res.sendStatus(409);
            return;
        }

        await db.collection('users').insertOne({
            ...user,
            password: passwordHashed
        })

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}