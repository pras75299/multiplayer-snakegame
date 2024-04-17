import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
const PORT = process.env.PORT;
const CONNECTION = process.env.CONNECTION;
const app = express();
import cors from 'cors';
app.use(express.json());
connectDb(CONNECTION);
app.get('/', (req, res) => {
  res.send('hello this is get');
});
app.use(cors());

app.listen(PORT, (req, res) => {
  console.log(`Everything is working fine ${PORT}`);
});
