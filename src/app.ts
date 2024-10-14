import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(express.raw({ type: 'application/json' }));


export default app;
