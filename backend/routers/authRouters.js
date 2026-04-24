const express = require('express');

const router = express.Router();
const {registerUser,loginUser,userInfo} = require('../controllers/authcontroller')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',userInfo);

module.exports = router;