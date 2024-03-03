const router = require(`express`).Router()
var createError = require('http-errors')
const usersModel = require(`../models/Users`)
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')
const multer=require('multer')
const upload=multer({dest: `${process.env.TSHIRT_FILES_FOLDER}`})
 const emptyFolder=require('empty-folder')

const checkThatFileIsUploaded = (req, res, next) =>
{
    if(!req.file)
    {
        return next(createError(400, `No file was selected to be uploaded`))
    }

    return next()
}
const checkThatFileIsAnImageFile = (req, res, next) =>
{
    if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`,  (err) => {return next(err)})
    }

    return next()
}

const checkThatUserIsNotAlreadyInUsersCollection = (req, res, next) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (err, uniqueData) =>
    {
        if(err)
        {
            return next(err)
        }
return next(createError(401))
    })

    return next()
}
const checkThatUserExistsInUsersCollection = (req, res, next) =>
{
    usersModel.findOne({email:req.params.email}, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }

        req.data = data
        return next()
    })
}
const addUser= (req,res)=>{
    if (!/^[a-zA-Z a-zA-Z]+$/.test(req.params.name)) {
        res.json({errorMessage: `Invalid name`});
        //^ is start of line, +@ means it has to include @, same with +.
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/.test(req.params.email))) {
        res.json({errorMessage: `Invalid email`})
    } else if (!/^[a-zA-Z0-9!"£_$*^&()+=#.-]+$/.test(req.params.password)) {
        res.json({errorMessage: `Invalid Password`})
    } else {
        // If a user with this email does not already exist, then create new user

        //Password              saltRounds
        bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
            if(err)
            {
                return next(err)
            }
            usersModel.create({
                name: req.params.name,
                email: req.params.email,
                address: {
                    address_line_1: "",
                    address_line_2: "",
                    address_line_3: "",
                    city: "",
                    county: "",
                    country: "",
                    post_code: "",
                },
                password: hash,
                profilePhotoFileName: req.file.filename
            }, (err, data) => {
                if(err)
                {
                    return next(err)
                }
                    const token = jwt.sign({email: data.email,accessLevel: data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})
                    fs.readFile(`${process.env.TSHIRT_FILES_FOLDER}/${req.file.filename}`, 'base64', (err,fileData)=>{
                        res.json({name: data.name, accessLevel: data.accessLevel, profilePhoto:fileData,token: token})
                    })


            })
        })
    }
}




const checkThatJWTPasswordIsValid = (req, res, next) =>
{
    bcrypt.compare(req.params.password, req.data.password, (err, result) =>
    {
        if(err)
        {
            return next(err)
        }

        if(!result)
        {
            return next(createError(401))
        }

        return next()
    })
}
const returnUsersDetailsAsJSON = (req, res) =>
{
    const token = jwt.sign({email: req.data.email, accessLevel:req.data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})
    if(req.data.profilePhotoFileName)
    {
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhotoFileName}`, 'base64', (err, fileData) =>
    {
        if(err)
        {
            return next(err)
        }

        return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:fileData, token:token})
    })
}
else
{
    return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:fileData, token:token})
}
}

const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            return res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            req.decodedToken = decodedToken
            return next()
        }
    })
}
const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {
        return next()
    }
    else
    {
        return res.json({errorMessage:`User is not an administrator`})
    }
}
const getUsers=(req,res)=>{
    usersModel.find((err, data) => {
        return res.json(data)
    })
}


const deleteUsers=(req,res)=>{
    // console.log(req.params.id)
    usersModel.findByIdAndRemove(req.params.id, (err, data) => {
        console.log("SERVER: Product deleted from collection")
    })
}


const readOneUser=(req,res)=>{
    // console.log("here1")
    usersModel.findById(req.params.id, (err, data) => {
        return res.json(data)
    })
}


const readByEmail=(req,res)=>{
    // console.log("passed email: ", req.params.email)

    usersModel.findOne({email: req.params.email}, (err, data) => {
        if(err)
        {
            return next(err)
        }
        // console.log("data:",data)
           return res.json(data)


    })
}


const addAddress=(req,res)=>{
    // console.log(req.params.id);
    // console.log("req.body: ",req.body)

    const update = {
        $set: {
            "address.address_line_1": req.body.newAddress.address_line_1,
            "address.address_line_2": req.body.newAddress.address_line_2,
            "address.address_line_3": req.body.newAddress.address_line_3,
            "address.city": req.body.newAddress.city,
            "address.county": req.body.newAddress.county,
            "address.country": req.body.newAddress.country,
            "address.post_code": req.body.newAddress.post_code,
        }
    };

    usersModel.findByIdAndUpdate(req.params.id, update, { new: true }, (err, data) => {
        if (data) {
            console.log("SERVER: User found, adding address to profile");
           return res.json(data); // Send back the updated user data
        } else {
            console.log("SERVER: Error updating user address:", error);
          return res.status(500).json({ errorMessage: "Error updating user address" });
        }
    });
}



const logout=(req,res)=>{
    res.json({})
}

router.post(`/users/Login/Register/:name/:email/:password`,upload.single("profilePhoto"),checkThatFileIsUploaded,checkThatFileIsAnImageFile,checkThatUserIsNotAlreadyInUsersCollection,addUser)


router.post(`/users/AccountPage/:email/:password`,checkThatUserExistsInUsersCollection,checkThatJWTPasswordIsValid,returnUsersDetailsAsJSON )

// get users from mongoDB
router.get(`/users`, getUsers)

// Delete one record
router.delete(`/users/:id`,verifyUsersJWTPassword,checkThatUserIsAnAdministrator,deleteUsers)

// Read one user via id
router.get(`/users/:id`, verifyUsersJWTPassword,readOneUser)

// Read one user via email
router.get(`/AddAddress/users/:email`,verifyUsersJWTPassword,readByEmail)

// Post new address to users data
router.put(`/AddAddress/users/:id`,addAddress)

router.post(`/users/AdminMenu`,logout)

module.exports = router