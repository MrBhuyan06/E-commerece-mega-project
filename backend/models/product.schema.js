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
            required:[true, "please provide a product price"],
            maxLength:[5, "product price should not be more then 5 digits"]
        },
        description:
        {
            type:String,
            // required:[true, "please provide a product price"],
            // maxLength:[5, "product price should not be more then 5 digits"]
            // use some form of editors - personal assignment
        },
        photos:[
            {
                secure_url:
                {
                    type:String,
                    required: true
                }
            }
        ],
        stock:
        {
            type:Number,
            default:0
        },
        sold:
        {
            type:Number,
            default:0
        },
        collectionId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Collection',
            // mongose collection ref type
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Product',productSchame)