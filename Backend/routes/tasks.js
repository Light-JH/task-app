const express = require('express')
const Tasks = require('../models/tasks')

const TasksRouter = express.Router()

TasksRouter.get('/', async(req, res) => {
    const tasks = await Tasks.find()
    res.send(tasks)
})

TasksRouter.post('/', async(req, res) => {
    const task = await Tasks.create({ content: req.body.content })
    res.send(task)
})

TasksRouter.put('/', async(req, res) => {
    const filter = { _id: req.body.id }
    const update = { content: req.body.content }
    const task = await Tasks.findOneAndUpdate(filter, update, { returnOriginal: false })
    res.send(task)
})

TasksRouter.delete('/', async(req, res) => {
    const removed = await Tasks.findByIdAndRemove(req.body.id)
    res.send(removed)
})

module.exports = TasksRouter