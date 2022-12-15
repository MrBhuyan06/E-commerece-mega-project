const mongoose=require('mongoose')


const collectionSchema =  mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, "Please provide a category name"],
            trim: true,
            maxLength:[120, "collection name should not be more than 120 characters"]
        }
    },
    {
        timestamps:true
    }
)


module.exports=mongoose.model('Collection', collectionSchema)