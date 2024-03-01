const mongoose = require(`mongoose`)

//        Document validation guide followed from https://www.mongodb.com/docs/v7.0/core/schema-validation/

let usersSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        dob: {type: String, required: true},
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
        collection: `users`,

        // Validation rules using JSON schema -> BSON = Binary JSON
        // Document validation guide followed from https://www.mongodb.com/docs/v7.0/core/schema-validation/specify-json-schema/#std-label-schema-validation-json
        // Validate holds document validation rules
        validate: {
            validator: { // validator for validation
                $jsonSchema: { // define the type of schema used
                    bsonType: "object", // type of document
                    required: ["name", "email", "password"], // fields of this collection that are required
                    properties: { // properties and their types within the collection
                        name: {
                            bsonType: "string",
                            description: "'name' must be a string and is required",
                            required: true,
                            minLength: 2,
                            maxLength: 40
                        },
                        email: {
                            bsonType: "string",
                            description: "'email' must be a string and is required",
                            required: true,
                        },
                        password: {
                            bsonType: "string",
                            description: "'password' must be a string and is required",
                            required: true,
                            minlength: 8
                        },
                        address: {
                            bsonType: "object", // address must be of type object
                            properties: {
                                address_line_1: {bsonType: "string"},
                                address_line_2: {bsonType: "string"},
                                address_line_3: {bsonType: "string"},
                                city: {bsonType: "string"},
                                county: {bsonType: "string"},
                                country: {bsonType: "string"},
                                post_code: {bsonType: "string"},
                            }
                        },
                        accessLevel: {
                            bsonType: "number",
                            required: true
                        },
                        profilePhotoFileName: {
                            bsonType: "string"
                        }
                    }
                },
                message: "Validation Failed"
           }
        }
    })

module.exports = mongoose.model(`users`, usersSchema)