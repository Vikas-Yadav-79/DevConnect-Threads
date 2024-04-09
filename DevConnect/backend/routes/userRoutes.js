const express = require('express');
const {signUpUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile,getallUser} = require('../controllers/userController');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router();


router.get('/profile/:query', getUserProfile)

router.post('/signup', signUpUser)

router.post('/login', loginUser)

router.post('/logout',logoutUser)
router.get('/getall',getallUser)

router.post('/follow/:id',protectRoute,followUnFollowUser)

router.put('/update/:id',protectRoute,updateUser)


module.exports = router;