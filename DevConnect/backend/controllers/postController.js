const Post = require('../models/postModel');
const User = require('../models/userModel');

const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ error: "Postedby and text fields are required" });
        }

        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create post" });
        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
        }

        // if (img) {
        //     const uploadedResponse = await cloudinary.uploader.upload(img);
        //     img = uploadedResponse.secure_url;
        // }

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }

};

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error fetching post:", err);
    }



};

const deletePost = async (req,res) =>{

    try{
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(400).json({
                error: "Post doesn't Exsits ! "
            })
        }

        if(post.postedBy.toString() !== req.user._id.toString()){
            res.status(404).json({
                message: "Unautorised acess !"
            })
        }

        await Post.findByIdAndDelete(req.params.id)


        res.status(200).json({
            message: "Post Deleted Succesfully ! "
        })

    }
    catch(err){

        res.status(500).json({message: err.message});
        console.log("Error occured while deleting Post !" , err.message);

    }

}


const likeUnlikePost = async (req,res) => {
    try{

        const {id:postId} = req.params;
        const userId = req.user._id;


        const post = await Post.findById(postId);
        if(!post){
            res.status(400).json({
                message: "Post not found !"
            })
        }

        const userLikedPost = post.likes.includes(userId);
        
        if(userLikedPost){
            //  Unlike the post 
            await Post.updateOne({_id:userId} ,{$pull:{likes:userId}})
            res.status(201).json({
                message: "Liked  post Success"
            })

        }
        else{
            post.likes.push(userId);
            await push.save()
            res.status(201).json({
                message: "Liked  post Success"
            })
        }


    }
    catch(err){
        res.status(500).json({error : err.message})
        console.log("Error ocuured while likeUnlikePost !" , err.message);

    }
}


module.exports = { createPost ,getPost,deletePost,likeUnlikePost};