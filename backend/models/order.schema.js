const mongoose=require('mongoose')


const orderSchema= mongoose.Schema(
    {
       products:
       {
        type:[
            {
                ProductId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"product",
                    required:true
                },
                count:Number,
                price:Number
            }
        ],
        required:true
      
       },
       user:
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
       address:
       {
        type:String,
        required: true
       },
       phoneNumber:
       {
        type:Number,
        required:true
       },
       amount:
       {
        type:Number,
        required:true
       },
       coupon:String,
       transactionId:String,
       status:
       {
        type:String,
        enum:['ORDER', "SHIPPED", "DELIVERED", "CANCELLED"] // assignement to improve this
       }
       // paymwnt MOdel : upi , creditcard or wallet, COD
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Order',orderSchema)