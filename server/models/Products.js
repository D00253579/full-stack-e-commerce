const mongoose = require(`mongoose`)
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
       // image_1:{type: Blob},
       // image_2:{type: Blob},
       // image_3:{type: Blob}
   },
   {
       collection: `tshirts`
   }
   )

module.exports = mongoose.model(`tshirts`, tShirtSchema)
