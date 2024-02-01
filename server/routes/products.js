const router = require(`express`).Router()

const tShirtModel = require(`../models/Products`)

// read all records
router.get(`/products`, (req, res) =>
{
    tShirtModel.find((error, data) =>
    {
        res.json(data)
    })
})


// Read one record
router.get(`/products/:id`, (req, res) =>
{
    tShirtModel.findById(req.params.id, (error, data) =>
    {              
        res.json(data)
    })
})


// Add new record
router.post(`/products`, (req, res) =>
{
    tShirtModel.create(req.body, (error, data) =>
    {
        res.json(data)
    })
})


// Update one record
router.put(`/products/:id`, (req, res) =>
{
    tShirtModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/products/:id`, (req, res) =>
{
    tShirtModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })       
})

module.exports = router