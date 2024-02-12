const mongoose = require(`mongoose`)
let tShirtPhotosSchema=new mongoose.Schema({
   filename:{type:String}
})
let tShirtSchema = new mongoose.Schema(
   {
        product_id: {type: Number},
        name: {type: String},
        colour: {type: String},
        size: {type: Array},
       price:{type: Number},
       gender:{type: String},
       category:{type: String},
       brand:{type: String},
       current_stock: {type:Number},
       photos:[tShirtPhotosSchema]
   },
   {
       collection: `tshirts`
   }
   )

module.exports = mongoose.model(`tshirts`, tShirtSchema)
