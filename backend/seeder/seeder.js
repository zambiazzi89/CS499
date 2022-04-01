import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { bids } from './bids.js'
import Bid from '../models/bid.js'
import { connectDB } from '../db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Bid.deleteMany()
    await Bid.insertMany(bids)
    console.log('Data inserted!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Bid.deleteMany()
    console.log('Data destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '--destroy') {
  destroyData()
} else {
  importData()
}
