const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ColumnSchema = new mongoose.Schema({
    title: {type: String, required: true},
    taskIds:[{type: ObjectId, ref: 'tasks'}]
})
ColumnSchema.set('toJSON', { virtuals: true })

const Columns = mongoose.model('columns', ColumnSchema)

module.exports = Columns