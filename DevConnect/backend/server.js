const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const  connectDB  = require('./db/connectDB');
const cookieParser = require('cookie-parser');
// const cors = require('cors')

const userRoutes = require ('./routes/userRoutes' );
const postRoutes = require ('./routes/postRoutes' );

const cloudinary = require('cloudinary').v2;

const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
__dirname = path.resolve();


// //Middleware


app.use(express.json({limit:"50mb"})); // to parse json data in the body
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


//http:localhost:5000 => backend
//http:localhost:3000 => frontend

//goal --> //http:localhost:5000 => backend, fontend

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join( __dirname,"/DevConnect/frontend/dist")));

    //react application
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname ,"DevConnect","frontend","dist","index.html"));

    })
}


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




