const mongoose= require('mongoose');

const couponSchema= mongoose.Schema(
    {
        code:
        {
            type:String,
            require:[true, "PLease provide a coupon name"]
        },
        discount:
        {
            type:Number,
            default:0
        },
        Active:
        {
            type:Boolean,
            default:true
        },
    },
    {
        timestamps:true
    }
)


module.exports=mongoose.model('Coupon',couponSchema);