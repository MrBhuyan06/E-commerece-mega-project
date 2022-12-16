const User = require('../models/user.schema.js')
const asyncHandler = require('../services/asyncHandler.js')
const CustomError = require('../utils/customError.js')
const JWT=require('jsonwebtoken')
const config= require('../config/index.js')

exports.isLoggedIn= asyncHandler( async(req, res, next) =>
{
    let token;

    if(req.cookies.token ||
       (rea.headers.authorization && req.headers.authorization.startsWith("Bearer")))
       {
        token=req.cookies || req.header.authorization.split(" ")[1]
       }
    if(! token)
    {
        throw new CustomError('Not authorized to acess this route', 401)
    }
    
    try {
       const decodeJWTPayLoad =JWT.verify(token, config.JWT_SECRET)
       //_id, find user based on id , set this in req.user
     req.user= await  User.findById(decodeJWTPayLoad._id, "name email role")
     next()
    } catch (error) {
        throw new CustomError('Not authorized to acess this route', 401)
    }



})