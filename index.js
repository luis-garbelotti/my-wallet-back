import express, { json } from 'express';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import cors from 'cors';
import joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required()
})

app.post('/', (req, res) => {

    res.sendStatus(201);

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