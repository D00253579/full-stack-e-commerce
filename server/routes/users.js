const router = require(`express`).Router()

const usersModel = require(`../models/Users`)
const bcrypt = require('bcryptjs')
router.post(`/users/Login/Register/:name/:email/:password`, (req, res) => {
    if (!/^[a-zA-Z]+$/.test(req.params.name)) {
        res.json({errorMessage: `Invalid name`});
        //^ is start of line, +@ means it has to include @, same with +.
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/.test(req.params.email))) {
        res.json({errorMessage: `Invalid email`})
    }
    else if (!/^[a-zA-Z0-9!"£_$*^&()+=#.-]+$/.test(req.params.password)) {
        res.json({errorMessage: `Invalid Password`})
    }
    else {

        // If a user with this email does not already exist, then create new user
        usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) => {
            if (uniqueData) {
                res.json({errorMessage: `User already exists`})
            } else {               //Password              saltRounds
                bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                    usersModel.create({
                        name: req.params.name,
                        email: req.params.email,
                        password: hash
                    }, (error, data) => {
                        if (data) {
                            res.json({name: data.name, accessLevel: data.accessLevel})
                        } else {
                            res.json({errorMessage: `User was not registered`})
                        }
                    })
                })
            }
        })
    }
})
router.post(`/users/Login/login/:email/:password`, (req, res) => {
    usersModel.findOne({email: req.params.email}, (error, data) => {
        if (data) {
            res.json({name: data.name})
        } else {
            console.log("not found in db")
            res.json({errorMessage: `User is not logged in`})
        }
    })
})


router.post(`/users/logout`, (req,res) =>
{
    res.json({})
})
module.exports=router