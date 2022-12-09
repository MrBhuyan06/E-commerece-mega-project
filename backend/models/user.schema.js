const { kMaxLength } = require('buffer')
const mongoose=require('mongoose')
const { object } = require('webidl-conversions')
const AuthRole = require('../utils/authRole.js')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema= mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, "Name is required"],
            maxLength:[50, 'name must be less then 50']
        },
        email:
        {
            type:String,
            required:[true, "email is required"],
            unique:true
            // regexr.com for regax
        },
        
        password:
        {
            type:String,
            required:[true, "password is required"],
            minLength:[8, 'password  must be atleast 8 characters '],
            select:false
            
        },
        role:
        {
            type:String,
            enum:Object.values(AuthRole),
            default:AuthRole.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date
        

    },
    {
        timestamps: true
    }
);

// challenge 1- encrypt password
// mongoose hooks







module.exports=mongoose.model('User',userSchema)