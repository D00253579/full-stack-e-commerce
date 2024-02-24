const router = require(`express`).Router()
const usersModel = require(`../models/Users`)
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

router.post(`/users/Login/Register/:name/:email/:password`, (req, res) => {
    if (!/^[a-zA-Z a-zA-Z]+$/.test(req.params.name)) {
        res.json({errorMessage: `Invalid name`});
        //^ is start of line, +@ means it has to include @, same with +.
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/.test(req.params.email))) {
        res.json({errorMessage: `Invalid email`})
    } else if (!/^[a-zA-Z0-9!"£_$*^&()+=#.-]+$/.test(req.params.password)) {
        res.json({errorMessage: `Invalid Password`})
    } else {

        // If a user with this email does not already exist, then create new user
        usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) => {
            if (uniqueData) {
                res.json({errorMessage: `User already exists`})
            } else {
                if (req.params.email === "admin@admin.com") {
                    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                        usersModel.create({ name: "Admin",email: "admin@admin.com",password: hash, accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) => {
                            if (createData) {
                                const token = jwt.sign({email: createData.email, accessLevel: createData.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})
                                res.json({name: createData.name, accessLevel: createData.accessLevel, token: token})
                            } else {
                                res.json({errorMessage: `Failed to create Admin user for testing purposes`})
                            }
                        })
                    })
                } else {
                    //Password              saltRounds
                    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                        usersModel.create({name: req.params.name, email: req.params.email, password: hash}, (error, data) => {
                            if (data) {
                                const token = jwt.sign({email: data.email, accessLevel: data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})
                                res.json({name: data.name, accessLevel: data.accessLevel, token: token})
                            } else {
                                res.json({errorMessage: `User was not registered`})
                            }
                        })
                    })
                }
            }
        })
    }
})
router.post(`/users/Login/Login/:email/:password`, (req, res) => {
    usersModel.findOne({email: req.params.email}, (error, data) => {

        if (data) {
            console.log("req pw: ", req.params.password)
            console.log("data pw: ", data.password)
            bcrypt.compare(req.params.password, data.password, (err, result) => {

                console.log("result: ", result)
                if (result) {
                    const token = jwt.sign({
                        email: data.email,
                        accessLevel: data.accessLevel
                    }, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})
                    res.json({name: data.name, accessLevel: data.accessLevel, token: token})
                    // console.log("name: ", data.name)
                    // console.log("access level: ", data.accessLevel)

                } else {
                    res.json({errorMessage: `Entered email and/or password is incorrect`})
                }
            })
        } else {
            console.log("not found in db")
            res.json({errorMessage: `User is not logged in`})
        }
    })
})

// get users from mongoDB
router.get(`/users`, (req, res) => {
    usersModel.find((error, data) => {
        res.json(data)
    })
})
// Delete one record
router.delete(`/users/:id`, (req, res) => {
    console.log(req.params.id)
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        if (err) {
            res.json(`User is not deleted`)
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                usersModel.findByIdAndRemove(req.params.id, (error, data) => {
                    console.log("SERVER: Product deleted from collection")
                    res.json(data)
                })
            }
        }
    })
})
router.post(`/users/Login/Logout`, (req, res) => {
    res.json({})
})
module.exports = router