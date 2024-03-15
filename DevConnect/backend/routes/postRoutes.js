
const express = require('express');
const { createPost,getPost, deletePost,likeUnlikePost,replyToPost ,getFeedPosts} = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router()
router.get('/feed',protectRoute,getFeedPosts)
router.post("/create", protectRoute, createPost);
router.get("/:id" , getPost)
router.delete("/:id" ,protectRoute, deletePost)
router.post('/like/:id',protectRoute,likeUnlikePost)
router.post('/reply/:id',protectRoute,replyToPost)




    

module.exports=router;