const User = require('../models/user.schema.js')
const asyncHandler = require('../services/asyncHandler.js')
const CustomError = require('../utils/customError.js')
const mailHepler=require('../utils/mailHelper.js')



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
const e = require('express')


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


/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:5000/api/auth/password/forgot
 * @description User will submit email and we will generate a token 
 * @parameters  email
 * @returns Success message - email send
 ******************************************************/

exports.forgotPassword= asyncHandler(async(req, res) =>
{
    const {email}=req.body
    if( !email)
    {
        throw new CustomError('email is required ', 400)
    }
    const user= await User.findOne({email})
   
    if( !user)
    {
        throw new CustomError('user not found ', 404)
    }
     const resetToken = user.generateForgotPasswordToken()

     await user.save({validateBeforeSave: false})

     const resetUrl =
     `${req.protocal}://${req.get("host")}//api/auth/password/reset/${resetToken}`
     
     const text=` Your password reset url is  
     \n\n ${resetUrl}\n\n
     `

     try {
        await mailHepler({
            email:user.email,
            subject: "password reset email for abhi e-comm",
            text:text,
        })
        res.status(200).json({
            success: true,
            message:`Email send to ${user.email}`
        })
     } catch (error) {
        // roll back - clear filed and save to DB
        user.forgotPasswordToken=undefined
        user.forgotPasswordExpiry=undefined
        await user.save({validateBeforeSave:false})

        throw new CustomError(err.message ||'Email sent failer', 500)
     }

})