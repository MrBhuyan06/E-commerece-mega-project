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
})