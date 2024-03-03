const router = require(`express`).Router()
const tShirtModel = require(`../models/Products`)
const jwt = require('jsonwebtoken')
const fs= require('fs')
const JWT_PRIVATE_KEY=fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME,'utf8')
const multer=require('multer')
var upload=multer({dest:`${process.env.TSHIRT_FILES_FOLDER}`})
var createError = require('http-errors')

const getAllProducts= (req,res)=>{
    tShirtModel.find((err, data) => {
        if(err)
        {
            return next(err)
        }
       return res.json(data)
    })
}


const getAllPhotos= (req,res)=>{
    fs.readFile(`${process.env.TSHIRT_FILES_FOLDER}/${req.params.filename}`,'base64',(err,fileData)=>{
        if (fileData){
           return res.json({image:fileData})
        }else{
           return res.json({image:null})
        }
    })
}
const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            return next(err)
        }

            req.decodedToken = decodedToken
           return next()

    })
}
const findProductByID =(req,res)=>{
    tShirtModel.findById(req.params.id, (err, data) => {
        if(err)
        {
            return next(err)
        }
        return res.json(data)
    })
}

const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {
        return next(createError(401))
    }
    return next()
}

const AddProduct=(req,res)=>{
    let tShirtDetails = new Object()
    tShirtDetails.product_id = req.body.product_id
    tShirtDetails.name = req.body.name
    tShirtDetails.colour = req.body.colour
    tShirtDetails.size = req.body.size
    tShirtDetails.price = req.body.price
    tShirtDetails.gender = req.body.gender
    tShirtDetails.category = req.body.category
    tShirtDetails.brand = req.body.brand
    tShirtDetails.current_stock = req.body.current_stock
    tShirtDetails.photos = []
    req.files.map((file, index) => {
        tShirtDetails.photos[index] = {filename: `${file.filename}`}
    })
    tShirtModel.create(tShirtDetails, (err, data) => {
        // console.log("data: ", data)
        // console.log("req.body: ", req.body)
        if(err)
        {
            return next(err)
        }
        return res.json(data)
// if (IdData){
        //     res.json(`Product ID already exists`)
        // }else {
        //     if (!/^[0-9]+$/.test(req.body.product_id)) {
        //         res.json({errorMessage: "Product_id must be a valid number"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.name)){
        //         res.json({errorMessage: "Name must be a valid string"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.colour)){
        //         res.json({errorMessage: "Colour must be a valid string"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.size)){
        //         res.json({errorMessage: "Size must be a valid string"})
        //     }else if (!/^[0-9]+$/.test(req.body.price) || req.body.price<0.00){
        //         res.json({errorMessage: "Invalid Price"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.gender)){
        //         res.json({errorMessage: "Gender must be a valid string"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.category)){
        //         res.json({errorMessage: "Category must be a valid string"})
        //     }else if (!/^[a-zA-Z]+$/.test(req.body.brand)){
        //         res.json({errorMessage: "Brand must be a valid string"})
        //     }else if (!/^[0-9]+$/.test(req.body.current_stock) || req.body.current_stock<0){
        //         res.json({errorMessage: "Current stock must be a valid number"})
        //     }
        //
        //     else {
        //
        //     }
        // }
    })
}

const updateProduct= (req,res)=> {
    // console.log("SERVER: router.put has been called")

    // console.log("Updating ID: ", req.params.id)
    // console.log("Passed product: ", req.body.updatedProduct)

    // tShirtModel.checkIfExists({product_id:req.body.product_id},(error,IdData)=>{
    //     if (IdData){
    //         res.json(`Product ID already exists`)
    //     }else {
    //         if (!/^[0-9]+$/.test(req.body.product_id)) {
    //             res.json({errorMessage: "Product_id must be a valid number"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.name)){
    //             res.json({errorMessage: "Name must be a valid string"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.colour)){
    //             res.json({errorMessage: "Colour must be a valid string"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.size)){
    //             res.json({errorMessage: "Size must be a valid string"})
    //         }else if (!/^[0-9]+$/.test(req.body.price) || req.body.price<0.00){
    //             res.json({errorMessage: "Invalid Price"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.gender)){
    //             res.json({errorMessage: "Gender must be a valid string"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.category)){
    //             res.json({errorMessage: "Category must be a valid string"})
    //         }else if (!/^[a-zA-Z]+$/.test(req.body.brand)){
    //             res.json({errorMessage: "Brand must be a valid string"})
    //         }else if (!/^[0-9]+$/.test(req.body.current_stock) || req.body.current_stock<0){
    //             res.json({errorMessage: "Current stock must be a valid number"})
    //         }
    //
    //         else {
    tShirtModel.findByIdAndUpdate(req.params.id, {$set: req.body.updatedProduct}, {new : true}, (err, data) => {
        if(err)
        {
            return next(err)
        }
        console.log("Product updated")
            console.log("req.body: ", req.body)
          return res.json(req.body)


    })
    //         }
    //     }
    // })
}


const deleteProduct=(req,res)=>{
    console.log(req.params.id)

    // console.log("here")
    tShirtModel.findByIdAndRemove(req.params.id, (err, data) => {
        if(err)
        {
            return next(err)
        }
        // console.log("SERVER: Product deleted from collection")
        return res.json(data)
    })
}

// read all records
router.get(`/products`,getAllProducts)

//Read photos
router.get(`/products/photo/:filename`, getAllPhotos)

// Read one record
router.get(`/products/:id`, verifyUsersJWTPassword, findProductByID)

// Add new record
router.post(`/products`,verifyUsersJWTPassword,checkThatUserIsAnAdministrator,upload.array("photos",parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)),AddProduct)

// Update one record
router.put(`/products/:id`,verifyUsersJWTPassword,checkThatUserIsAnAdministrator,updateProduct)

// Delete one record
router.delete(`/products/:id`,verifyUsersJWTPassword,checkThatUserIsAnAdministrator,deleteProduct)

module.exports = router