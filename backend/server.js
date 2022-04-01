import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import bidsRouter from './routes/bids.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/bids', bidsRouter)

app.listen(5000, () => console.log('Server Running'))
