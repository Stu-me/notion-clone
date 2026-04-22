const jwt = require('jsonwebtoken');
const user = require('../models/user');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req, res , next ) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]; // breaking the token at first space and taking the second word
        
        const decoded = jwt.verify(token,process.env.)
    }
})