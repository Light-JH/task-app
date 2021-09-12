const express = require('express')
const Columns = require('../models/columns')

const ColumnsRouter = express.Router()

ColumnsRouter.get('/', async(req, res) => {
    const columns = await Columns.find()
    res.send(columns)
})

ColumnsRouter.post('/', async(req, res) => {
    const column = await Columns.create({
        title: req.body.title,
        taskIds: req.body.taskIds
    })
    res.send(column)
})

ColumnsRouter.put('/', async(req, res) => {
    const filter = {_id:req.body.id}
    const update = {
        title: req.body.title,
        taskIds: req.body.taskIds
    }
    let column = await Columns.findOneAndUpdate(
        filter, update, { returnOriginal: false })
    res.send(column)
})

module.exports = ColumnsRouter