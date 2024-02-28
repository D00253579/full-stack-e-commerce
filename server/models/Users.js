const mongoose = require(`mongoose`)

let addressSchema = new mongoose.Schema(
    {
        address_line_1: {type: String, required: true},
        address_line_2: {type: String, required: true},
        city: {type: String, required: true},
        county: {type: String, required: true},
        postal_code: {type: String, required: true}
    }
)
let usersSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String,required:true},
        address: [addressSchema],
        accessLevel: {type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
        profilePhotoFileName: {type:String, default:""}
    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersSchema)