const mongoose=require('mongoose')

const productSchame= mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, "please provide a product name"],
            trim:true,
            maxLength:[120, "product name should be a max of 120 characters"]
        },
        price:
        {
            type:Number,
            required:[true, "please provide a product name"],
            trim:true,
            maxLength:[120, "product name should be a max of 120 characters"]
        },
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Product',productSchame)