
const express = require('express');
const { createPost,getPost, deletePost,likeUnlikePost } = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router()
router.post("/create", protectRoute, createPost);
router.get("/:id" , getPost)
router.delete("/:id" ,protectRoute, deletePost)

router.get('/like/:id',protectRoute,likeUnlikePost)


    

module.exports=router;