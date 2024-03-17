const express = require('express');
const dotenv = require('dotenv');
const  connectDB  = require('./db/connectDB');
const cookieParser = require('cookie-parser');

const userRoutes = require ('./routes/userRoutes' );
const postRoutes = require ('./routes/postRoutes' );


const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;


app.use(express.json()); // to parse json data in the body

app.use(express.urlencoded({  extended: true})); // to handle the url encoded data
app.use(cookieParser());


//Routes 

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});