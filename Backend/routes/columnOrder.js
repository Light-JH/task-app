const express = require('express')
const ColumnOrder = require('../models/columnOrder')

const ColumnsOrderRouter = express.Router()

ColumnsOrderRouter.get('/', async(req, res) => {
    const orders = await ColumnOrder.findOne()
    res.send(orders)
})
 
ColumnsOrderRouter.put('/', async(req, res) => {
    const filter = {}
    const update = { order: req.body.order }
    let columnOrder = await ColumnOrder.findOneAndUpdate(
        filter, update, { returnOriginal: false }
    )
    res.send(columnOrder)
})

module.exports = ColumnsOrderRouter