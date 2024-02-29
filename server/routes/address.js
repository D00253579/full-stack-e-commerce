const router = require(`express`).Router()
const addressModel = require(`../models/Address`)
const jwt = require('jsonwebtoken')
const fs= require('fs')
const JWT_PRIVATE_KEY=fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME,'utf8')

router.post(`/address/:email`, (req, res) => {

    const address = req.body
    addressModel.create(address ,(error, data) => {
        if(error){
            console.log("Error creating address")
        } else {
            console.log("new address: ",req.body)
            console.log("id: ",req.params.id)
            console.log("address created")
            //res.json(data)
        }
    })

})