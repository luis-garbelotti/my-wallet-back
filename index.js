import express, { json } from 'express';
import { MongoClient } from "mongodb";

const app = express();

app.use(cors());
app.use(json());

app.listen(5000);