const router = require(`express`).Router()

const usersModel = require(`../models/Users`)

router.post(`/users/Login/Register/:name/:email/:password`, (req, res) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) =>
    {
        if (uniqueData)
        {
            res.json({errorMessage: `User already exists`})
        } else
        {
            usersModel.create({name: req.params.name, email: req.params.email, password: req.params.password}, (error, data) =>
            {
                if (data)
                {
                    res.json({name: data.name, accessLevel: data.accessLevel})
                } else
                {
                    res.json({errorMessage: `User was not registered`})
                }
            })
        }
    })
})
router.post(`/users/Login/login/:email/:password`, (req,res) =>
{
    usersModel.findOne({email:req.params.email}, (error, data) =>
    {
        if(data)
        {
                    res.json({name: data.name})
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        }
    })
})


router.post(`/users/logout`, (req,res) =>
{
    res.json({})
})
module.exports=router