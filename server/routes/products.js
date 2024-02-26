const router = require(`express`).Router()

const tShirtModel = require(`../models/Products`)
const jwt = require('jsonwebtoken')
const fs= require('fs')
const JWT_PRIVATE_KEY=fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME,'utf8')
// read all records
router.get(`/products`, (req, res) => {

    tShirtModel.find((error, data) => {
        res.json(data)
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
router.post(`/products`, (req, res) => {
    console.log("here1")

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, decodedToken) => {
        if (err) {
            console.log("here2")
            res.json(`User is not logged in`)
        } else {
            console.log("here3")

            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                console.log("here4")
                console.log(decodedToken.accessLevel)
                    tShirtModel.create(req.body, (error, data) => {
                        res.json(data)
                        console.log("response")

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