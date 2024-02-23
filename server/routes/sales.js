const router = require(`express`).Router()

const salesModel = require(`../models/Sales`)
const productsModel = require(`../models/Products`)


const createNewSaleDocument = (req, res, next) =>
{
    // Use the PayPal details to create a new sale document
    let saleDetails = new Object()

    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.product_id = req.params.product_id
    saleDetails.price = req.params.price
    saleDetails.customerName = req.params.customerName
    saleDetails.customerEmail = req.params.customerEmail


    productsModel.findByIdAndUpdate({_id:req.params.product_id}, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }
    })

    salesModel.create(saleDetails, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }
    })

    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:product_id/:price/:customerName/:customerEmail', createNewSaleDocument)


module.exports = router