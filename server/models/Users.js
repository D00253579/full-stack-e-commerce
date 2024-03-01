const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String,required:true},
        address: {
            address_line_1: {type: String, required: false},
            address_line_2: {type: String, required: false},
            address_line_3: {type: String, required: false},
            city: {type: String, required: false},
            county: {type: String, required: false},
            country: {type: String, required: false},
            post_code: {type: String, required: false},
        },
        accessLevel: {type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
        profilePhotoFileName: {type:String, default:""}
    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersSchema)