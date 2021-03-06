require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');
const authRouter = require('./src/routes/authRouter');

const app = express();
app.use(express.json());
app.use(cors());

// connect
db.connect();

app.use('/api', authRouter);

app.listen(5000, () => {
  console.log(`dang chay tren port 5000 a`);
});
