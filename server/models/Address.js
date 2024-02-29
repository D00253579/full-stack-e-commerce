const mongoose = require(`mongoose`)

let addressSchema = new mongoose.Schema(
    {
        userID: {type: Number, required: true},
        address_line_1: {type: String, required: true},
        address_line_2: {type: String, required: true},
        address_line_3: {type: String,},
        city: {type: String, required: true},
        county: {type: String},
        country: {type: String, required: true},
        post_code: {type: String, required: true}
    }
)
module.exports = mongoose.model(`address`, addressSchema)
