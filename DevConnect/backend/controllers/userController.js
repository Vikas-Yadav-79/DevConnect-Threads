const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser')
const generateTokenAndSetCookie = require('../utilis/helpers/generateTokenAndSetCookie');
const { json } = require('express');
const { use } = require('../routes/userRoutes');
const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;
const signUpUser = async (req, res) => {
    try {

        const { name, email, username, password } = req.body;
        const user = await User.findOne({ $or: [{ email }, { password }] });

        if (user) {
            return res.status(400).json({ error: "User Already exists :" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User(
            {
                name,
                email,
                username,
                password: hashedPassword,

            }
        )

        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json(
                {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                    bio:newUser.bio,
                    profilePic:newUser.profilePic
                }
            )
        }
        else {
            res.status(400).json({
                error: " , Error occured creating newUser"
            })
        }


    }

    catch (err) {

        res.status(500).json({ error: err.message })
        console.log("Error ocuured while sign Up " + err.message)

    }


}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

        if (user.isFrozen) {
            user.isFrozen = false;
            await user.save();
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser: ", error.message);
    }
};

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString())
        {
            return res.status(400).json({ error: "You can't Follow , UnFollow Yourself " })
        } 
        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User Not Found" })
        }
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            // unfollow the User
            // usertomodify unfollows currentUser , so pull the 
            // usertomodify->id from the followers list of  currentuser|
            await User.findByIdAndUpdate(id, {
                $pull: {
                    followers: req.user._id
                }
            });
            // usertomodify unfollows currentUser  , so pull the 
            // currentUser->id from the following list of  usertomodify|
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {
                    following: id
                }
            });
            res.status(200).json({ message: "User UnFollowed Succesfully ! " });
        }
        else {
            // follow the User
            // usertomodify follows currentUser , so push the 
            // usertomodify->id to the followers list of  currentuser|
            await User.findByIdAndUpdate(id, {
                $push: {
                    followers: req.user._id
                }
            });
            // usertomodify follows currentUser , so push the 
            // currentuser->id to the following list of  usertomodify|
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    following: id
                }
            });
            res.status(200).json({ message: "User Followed Succesfully ! " });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error while Following :", err.message)
    }

}


const updateUser = async (req, res) => {
    const { username, name, email, password, bio } = req.body;
    let {profilePic} = req.body
    const userId = req.user._id;

    try {
        let userToUpdate = await User.findById(userId);
        if (!userToUpdate) {
            return res.status(404).json({
                error: "User Not Found"
            });
        }

        if (userId.toString() !== req.params.id) {
            return res.status(404).json({
                error: "You cannot update Others Profile"
            });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userToUpdate.password = hashedPassword;
        }

        if(profilePic){
            if(userToUpdate.profilePic){
                await cloudinary.uploader.destroy(userToUpdate.profilePic.split("/").pop().split(".")[0]);

            }
           const uploadrespones=await cloudinary.uploader.upload(profilePic)
           profilePic = uploadrespones.secure_url;

        }

        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.username = username || userToUpdate.username;
        userToUpdate.profilePic = profilePic || userToUpdate.profilePic;
        userToUpdate.bio = bio || userToUpdate.bio;

        userToUpdate = await userToUpdate.save();

        res.status(200).json({ message: "User updated successfully", user: userToUpdate });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error occurred while updating: " + err.message);
    }
};


const getUserProfile = async(req,res) =>{

    
    try{
        let user;
        const  {query} = req.params;
        if(mongoose.Types.ObjectId.isValid(query)){
            user = await User.findOne({_id:query}).select("-password").select("-updatedAt");

        }
        else{
            user = await User.findOne({username:query}).select("-password").select("-updatedAt");


        }
        if(!user){
            return res.status(404).json({error:"User Not found  ! "});
        }
            res.status(200).json(user)
    }
    catch(err){

        res.status(500).json({error:err.message})
        console.log("Erro While getting user Profile !" + err.message);

    }

}

module.exports = {
    signUpUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile
};
