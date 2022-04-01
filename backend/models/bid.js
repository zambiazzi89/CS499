import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema({
  bidId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fund: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Bid', bidSchema)
