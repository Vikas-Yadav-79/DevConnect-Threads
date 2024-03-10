const express = require('express');
const dotenv = require('dotenv');
const  connectDB  = require('./db/connectDB');
const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
