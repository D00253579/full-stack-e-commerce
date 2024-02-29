const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String,required:true},
        address: {
            address_line_1: "",
            address_line_2: "",
            address_line_3: "",
            city: "",
            county: "",
            country: "",
            post_code: "",
        },
        accessLevel: {type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
        profilePhotoFileName: {type:String, default:""}
    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersSchema)