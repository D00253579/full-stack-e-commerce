const router = require(`express`).Router()
const tShirtModel = require(`../models/Products`)
const jwt = require('jsonwebtoken')
const fs= require('fs')
const JWT_PRIVATE_KEY=fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME,'utf8')
const multer=require('multer')
var upload=multer({dest:`${process.env.TSHIRT_FILES_FOLDER}`})
// read all records
router.get(`/products`, (req, res) => {

    tShirtModel.find((error, data) => {
        res.json(data)
    })
})
router.get(`/products/photo/:filename`,(req,res)=>{
    fs.readFile(`${process.env.TSHIRT_FILES_FOLDER}/${req.params.filename}`,'base64',(err,fileData)=>{
        if (fileData){
            res.json({image:fileData})
        }else{
            res.json({image:null})
        }
    })
})


// Read one record

router.get(`/products/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        if (err) {
            res.json(`User is not logged in`)
        } else {
            tShirtModel.findById(req.params.id, (error, data) => {
                res.json(data)
            })
        }

    })
})



// Add new record
router.post(`/products`,upload.array("photos",parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), (req, res) => {

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        console.log("token: ", decodedToken)
        console.log(req.body)
        if (err) {
            res.json(`User is not logged in`)
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                let tShirtDetails=new Object()
                tShirtDetails.name=req.body.name
                tShirtDetails.colour=req.body.colour
                tShirtDetails.size=req.body.size
                tShirtDetails.price=req.body.price
                tShirtDetails.gender=req.body.gender
                tShirtDetails.category=req.body.category
                tShirtDetails.brand=req.body.brand
                tShirtDetails.current_stock=req.body.current_stock
                tShirtDetails.photos=[]
                req.files.map((file,index)=>{
                    tShirtDetails.photos[index]={filename:`${file.filename}`}
                })
                    tShirtModel.create(tShirtDetails, (error, data) => {
                        // console.log("data: ", data)
                        // console.log("req.body: ", req.body)
                        if(error) {
                            console.log("SERVER: Error creating product: ", error)
                        } else {
                            console.log("SERVER: Product created: ", data)
                            res.json(data)
                        }


                    })
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
            }
        }
    })
})


// Update one record

router.put(`/products/:id`, (req, res) => {
    console.log("SERVER: router.put has been called")
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        if (err) {
            res.json(`User is not logged in`)
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                console.log("Updating ID: ", req.params.id)
                console.log("Passed product: ", req.body.updatedProduct)

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
                            tShirtModel.findByIdAndUpdate(req.params.id, {$set: req.body.updatedProduct}, {new : true}, (error, data) => {
                                if(data) {
                                    console.log("Product updated")
                                    console.log("req.body: ", req.body)
                                    res.json(req.body)
                                } else {
                                    console.log("Product not updated")

                                }

                            })
                //         }
                //     }
                // })
            }
        }
    })

})


// Delete one record
router.delete(`/products/:id`, (req, res) => {
    console.log(req.params.id)
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        if (err) {
            res.json(`User is not logged in`)
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                console.log("here")
                tShirtModel.findByIdAndRemove(req.params.id, (error, data) => {
                    console.log("SERVER: Product deleted from collection")
                    res.json(data)
                })
            }
        }
    })
})
module.exports = router