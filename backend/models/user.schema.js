const { kMaxLength } = require('buffer')
const mongoose=require('mongoose')
const { object } = require('webidl-conversions')
const AuthRole = require('../utils/authRole.js')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const crypto=require('crypto')
// const { JWT_EXPIRY } = require('../config/index.js')
const config = require('../config/index.js')

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

// challenge 1- encrypt password -hooks
// mongoose hooks

userSchema.pre('save',  async function(next){

    if(! this.isModified("password"))  return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// mongoose schema method
// add more feature directly to your schema

userSchema.methods=
{
    //compare password
    comparePassword: async function(enterPassword)
    {
        return await bcrypt.compare(enterPassword, this.password)
    },
    //genrate JWT token 
    getJwtToken: function() 
    {
      return JWT.sign(
        {
            _id:this._id,
            role:this.role
        },
        config.JWT_SECRET,
        {
            expiresIn:config.JWT_EXPIRY
        }
      )
    },

    generateForgotPasswordToken: function()
    {
         const forgotToken=crypto.randomBytes(20).toString('hex')

         // step 1- save to DB
         this.forgotPasswordToken= crypto
         .createHash("sha256")
         .update(forgotToken)
         .digest('hex')
         
         this.forgotPasswordExpiry= Date.now() + 20 * 60 * 1000 // 20 min
         // step 2 - return values to user

         return forgotToken
    }
}




module.exports=mongoose.model('User',userSchema)