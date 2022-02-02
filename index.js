import express, { json } from 'express';
import { MongoClient } from "mongodb";
import cors from 'cors';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required()
});

app.post('/', async (req, res) => {

    const { email, password } = req.body;
    let mongoClient;

    try {

        mongoClient = new MongoClient(process.env.MONGO_URI);
        await mongoClient.connect();

        const dbMyWallet = mongoClient.db('my-wallet');
        const user = await dbMyWallet.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await dbMyWallet.collection('sessions').insertOne({ token, userId: user._id });
            return res.send({ token });
        }

        res.sendStatus(401);
        mongoClient.close();

    } catch (error) {

        res.sendStatus(500);
        mongoClient.close();

    }
})

app.post('/register', async (req, res) => {

    const user = req.body;
    let mongoClient;

    const validation = userSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(422);
    }

    try {

        const passwordHashed = bcrypt.hashSync(user.password, 10);

        mongoClient = new MongoClient(process.env.MONGO_URI);
        await mongoClient.connect();

        const dbMyWallet = mongoClient.db('my-wallet');

        const findUser = await dbMyWallet.collection('users').findOne({ email: user.email });

        if (findUser) {
            res.sendStatus(409);
            mongoClient.close();
            return;
        }

        await dbMyWallet.collection('users').insertOne({
            ...user,
            password: passwordHashed
        })

        res.sendStatus(201);
        mongoClient.close();

    } catch (error) {
        res.sendStatus(500);
        mongoClient.close();
    }

})

app.listen(5000);