const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const signUpUser  = async(req,res) =>{


    try{

        const {name,email,username,password} = req.body;
        const user = await User.findOne({$or : [{email},{password}]});

        if(user){
            return res.status(400).json({message:"User Already exists :"});
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User(
            {
                name,
                email,
                username,
                password : hashedPassword,

            }
        )

        await newUser.save();

        if (newUser){
            res.status(201).json(
                {
                    _id : newUser._id,
                    name: newUser.name,
                    email : newUser.email,
                    username : newUser.username,
                }
            )
        }
        else{
            res.status(400).json({
                message: " , Error occured creating newUser"
            })
        }


    }

    catch(err){

        res.status(500).json({message : err.message})
        console.log("Error ocuured while sign Up " + err.message)

    }

     

    

}

module.exports = signUpUser;