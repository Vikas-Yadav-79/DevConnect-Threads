const express = require('express');
const {signUpUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile} = require('../controllers/userController');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router();


router.get('/profile/:id', getUserProfile)

router.post('/signup', signUpUser)

router.post('/login', loginUser)

router.post('/logout',logoutUser)

router.post('/follow/:id',protectRoute,followUnFollowUser)

router.post('/update/:id',protectRoute,updateUser)


module.exports = router;