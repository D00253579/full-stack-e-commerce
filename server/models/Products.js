const mongoose = require(`mongoose`)
let tShirtPhotosSchema=new mongoose.Schema({
   filename:{type:String}
})
let tShirtSchema = new mongoose.Schema(
   {
       product_id: {type: Number},
       name: {type: String},
       colour: {type: String},
       size: {
           type: [String],
           set: function(value) { // this function splits the string before storing it in the collection
               // If value is a string, split it into an array
               if (typeof value === 'string') {
                   return value.split(',');
               }
               // return the original value
               return value;
           }
       },
       price:{type: Number},
       gender:{type: String},
       category:{type: String},
       brand:{type: String},
       current_stock: {type:Number},
       //sold:{type:Boolean,default:false}
       photos:[tShirtPhotosSchema]
   },
   {
       collection: `tshirts`,

       // Validation rules using JSON schema -> BSON = Binary JSON
       // Document validation guide followed from https://www.mongodb.com/docs/v7.0/core/schema-validation/specify-json-schema/#std-label-schema-validation-json
       // Validate holds document validation rules
       validate: {
           validator: { // validator for validation
               $jsonSchema: { // define the type of schema used
                   bsonType: "object", // type of document

                   // fields of this collection that are required
                   required: ["product_id", "name", "colour", "size", "price", "gender", "category", "brand", "current_stock"],
                   properties: {// properties and their types within the collection
                       product_id: {
                           bsonType: "number",
                           description: "'product_id' must be a number and is required",
                           required: true
                       },
                       name: {
                           bsonType: "string",
                           description: "'name' must be a string and is required",
                           minlength: 15,
                           maxLength: 100
                       },
                       colour: {
                           bsonType: "string",
                           description: "'colour' must be a string and is required",
                           required: true
                       },
                       size: {
                           bsonType: "array",
                           description: "'size' must be an array and is required",
                           required: true,
                           items: {
                               bsonType: "string",
                               description: "Each item in 'size' must be a string and is required",
                               required: true
                           }
                       },
                       price: {
                           bsonType: "number",
                           description: "'price' must be a number and is required",
                           required: true
                       },
                       gender: {
                           bsonType: "string",
                           description: "'gender' must be a string and is required",
                           required: true,
                           enum: ["male", "female", "other"]
                       },
                       category: {
                           bsonType: "string",
                           description: "'category' must be a string and is required",
                           required: true,
                       },
                       brand: {
                           bsonType: "string",
                           description: "'brand'' must be a string and is required",
                           required: true,
                       },
                       current_stock: {
                           bsonType: "number",
                           description: "'current_stock' must be a string and is required",
                           required: true,
                       }
                   }
               }
           }
       }
   }
   )

module.exports = mongoose.model(`tshirts`, tShirtSchema)
