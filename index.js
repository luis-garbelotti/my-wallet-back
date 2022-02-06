import express, { json } from 'express';
import router from './src/routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());

app.use(router);

app.listen(5000);