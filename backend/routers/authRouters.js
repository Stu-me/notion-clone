const express = require('express');
const authMiddleware  = require('../middlewares/authMiddleware')

const router = express.Router();
const {registerUser,loginUser,userInfo} = require('../controllers/authcontroller')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',authMiddleware,userInfo);

module.exports = router;