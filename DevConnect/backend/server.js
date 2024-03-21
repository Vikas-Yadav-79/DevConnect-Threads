const express = require('express');
const dotenv = require('dotenv');
const  connectDB  = require('./db/connectDB');
const cookieParser = require('cookie-parser');

const userRoutes = require ('./routes/userRoutes' );
const postRoutes = require ('./routes/postRoutes' );

const cloudinary = require('cloudinary').v2;

const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;


//Middleware

app.use(express.json()); // to parse json data in the body
app.use(express.urlencoded({  extended: true})); // to handle the url encoded data
app.use(cookieParser());


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


//Routes 

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});