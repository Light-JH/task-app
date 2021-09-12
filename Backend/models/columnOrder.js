const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ColumnOrderSchema = new mongoose.Schema({
    order: [{type: ObjectId, ref: 'columns'}]
})
ColumnOrderSchema.set('toJSON', { virtuals: true })

const ColumnOrder = mongoose.model('columnOrder', ColumnOrderSchema)

module.exports = ColumnOrder