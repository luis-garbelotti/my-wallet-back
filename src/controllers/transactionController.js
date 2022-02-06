import db from "../database.js";
import { ObjectId } from "mongodb";

export async function transactionHistory(req, res) {

    const user = res.locals.user;

    try {

        const userTransactions = await db.collection('transactions').find({ userId: user._id }).toArray();

        if (!userTransactions) {
            return res.sendStatus(404);
        }

        res.send(userTransactions);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deposit(req, res) {

    const thisDeposit = req.body;

    try {

        const user = await db.collection('users').findOne({ _id: new ObjectId(thisDeposit.userId) });

        if (!user) {
            return res.sendStatus(401);
        }

        await db.collection('transactions').insertOne({ ...thisDeposit, userId: user._id });
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }

}

export async function payment(req, res) {

    const payment = req.body;

    try {

        const user = await db.collection('users').findOne({ _id: new ObjectId(payment.userId) });

        if (!user) {
            return res.sendStatus(401);
        }

        await db.collection('transactions').insertOne({ ...payment, userId: user._id });
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updateDeposit(req, res) {

    const { idTransaction } = req.params;

    const updatedTransaction = req.body;

    try {

        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(idTransaction) });

        if (!transaction) {
            return res.sendStatus(404);
        }

        await db.collection('transactions').updateOne({
            _id: transaction._id
        }, {
            $set: {
                description: updatedTransaction.description,
                value: updatedTransaction.value
            }
        })

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updatePayment(req, res) {

    const { idTransaction } = req.params;

    const updatedTransaction = req.body;

    try {

        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(idTransaction) });

        if (!transaction) {
            return res.sendStatus(404);
        }

        await db.collection('transactions').updateOne({
            _id: transaction._id
        }, {
            $set: {
                description: updatedTransaction.description,
                value: updatedTransaction.value
            }
        })

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {

    const { idTransaction } = req.params;

    try {

        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(idTransaction) });

        if (!transaction) {
            return res.sendStatus(404);
        }

        await db.collection('transactions').deleteOne({ _id: transaction._id })

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}