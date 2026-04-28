const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // good for deployement 
const jwt = require('jsonwebtoken')
const {userInputValidator,userLoginValidator} = require('../middlewares/userValidator');

// will put in utility folder after checking the flow 

const generateToken = (id)=>{
    return jwt.sign(
        {id},                       // payload
        process.env.JWT_SECRET,     // secret signature 
        {expiresIn:'10m'}
    )
}


//@desc register new user
//@route POST /register
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const validUser = userInputValidator.parse(req.body);
    const {name, email , password} = validUser;
    const emailExists = await User.findOne({email});

    if(emailExists){
        res.status(400);
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    });

    res.status(201).json({
        _id:newUser._id,
        name:name,
        email:email,
        token:generateToken(newUser._id)
    });
});


//@desc login  user
//@route POST /login
//@access public

const loginUser = asyncHandler(async(req,res)=>{
    const validInput = userLoginValidator.parse(req.body);

    const {email , password} = validInput;

    const validUser= await User.findOne({email:email});

    if(!validUser){
        res.status(404);
        throw new Error('Register first');
    }
    const isMatch = await bcrypt.compare(password,validUser.password)
    if(!isMatch){
        res.status(400);
        throw new Error('invalid credentials');
    }
    
    const token = generateToken(validUser._id);
    res.status(200).json({
        _id:validUser._id,
        name:validUser.name,
        email:validUser.email,
        token
    });
});


//@desc Info about the user
//@route GET /me
//@access private

const userInfo = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user); // req.user is formed from the the token we give 
     // we create token and send id in it 
});

module.exports = {registerUser,loginUser,userInfo}