const User = require('../models/user.schema.js')
const asyncHandler = require('../services/asyncHandler.js')
const CustomError = require('../utils/customError.js')



exports.cookieOptions={
    expires:new Date(Date.now) + 3 * 24 * 60 * 60 * 1000),
    httpOnly:true,
    // could be in a separate file in utils

}


/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

exports.sigUp=asyncHandler(async (req,res) =>{
   const {name, email, password}= req.body

   if(!name || !email || !password)
   {
    throw new CustomError('Please fill all the fields', 400)
   }
   //check if the user exits
   const existingUser=await User.findOne({email})

   if(existingUser)
   {
    throw new CustomError('User already exists', 400)
   }

   const user = await User.create({
    name,
    email,
    password

   })

   const token= user.getJwtToken()
   user.password = undefined

   res.cookie("token", token, this.cookieOptions)
   res.status(200).json({
    success:true,
    token,
    user
   })
})


/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/signup
 * @description User signIn Controller for login new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

const asyncHandler = require("../services/asyncHandler.js");


exports.login= asyncHandler(async (req, res) =>
{
    const { email, password}= req.body

    if(  !email || !password)
    {
     throw new CustomError('Please fill all the fields', 400)
    }

    const user =   User.findOne({email}).select("+password")

    if( !user)
    {
        throw new CustomError('Invalid credentials', 400)
    }
    const ispasswordMatch = await user.comparePassword(password)

    if(ispasswordMatch)
    {
        const token= user.getJwtToken()
        user.password = undefined
        res.cookie('token', token, this.cookieOptions)
        res.status(200).json({
            success:true,
            token,
            user
        })
    }
    throw new CustomError("Invalid credentials - pass", 400)
})

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/logout
 * @description User Logout bby clearing user cookies
 * @parameters  
 * @returns Success message
 ******************************************************/

exports.logout= asyncHandler(async (_req, res) =>
{

    // res.clearCookie()
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
})