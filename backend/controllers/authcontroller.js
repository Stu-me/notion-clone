const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // good for deployement 
const jwt = require('jsonwebtoken')
const {userInputValidator,userLoginValidator} = require('../middlewares/userValidator');
const { email } = require('zod');

// will put in utility folder after checking the flow 

const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
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
        return res.status(400).json({message:"Email already registered"});
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
    validInput = userLoginValidator.parse(req.body);

    const {email , password} = validInput;

    const validUser= await User.findOne({email:email});

    if(!validUser){
        res.send("Register first");
    }
    const isMatch = await bcrypt.compare(password,validUser.password)
    if(!isMatch){
        return res.status(400).json({message:'invalid credentials'})
    }
    
    const token = generateToken(validUser._id);
    res.status(200).json({
        _id:validUser
    });
});


//@desc Info about the user
//@route GET /me
//@access private

const userInfo = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user);
});

module.exports = {registerUser,loginUser,userInfo}