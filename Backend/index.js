require('dotenv').config()
const port = process.env.PORT || 5000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true
})

const express = require('express')
const cors = require('cors')
const app = express()

// process json body 
app.use(express.json())
app.use(cors())

app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/columns', require('./routes/columns'))
app.use('/api/columnsOrder', require('./routes/columnOrder'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
