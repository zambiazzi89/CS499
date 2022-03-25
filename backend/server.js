require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to the db'))

app.use(express.json())

const bidsRouter = require('./routes/bids')
app.use('/bids', bidsRouter)

app.listen(5000, () => console.log('Server Running'))
