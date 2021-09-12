const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    content: {type: String, required: true}
})
TaskSchema.set('toJSON', { virtuals: true })

const Tasks = mongoose.model('tasks', TaskSchema)

module.exports = Tasks