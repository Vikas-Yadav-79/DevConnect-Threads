
const express = require('express');
const { createPost,getPost, deletePost,likeUnlikePost,replyToPost ,getFeedPosts, getUserPosts} = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router()
router.get('/feed',protectRoute,getFeedPosts)
router.post("/create", protectRoute, createPost);
router.get("/:id" , getPost)
router.get("/user/:username" , getUserPosts)
router.delete("/:id" ,protectRoute, deletePost)
router.put('/like/:id',protectRoute,likeUnlikePost)
router.put('/reply/:id',protectRoute,replyToPost)




    

module.exports=router;