import express from 'express'
import Bid from '../models/bid.js'

const router = express.Router()

const getBid = async (req, res, next) => {
  let bid
  try {
    bid = await Bid.findOne({ bidId: req.params.id })
    if (bid === null) {
      return res.status(404).json({ message: 'Bid not found.' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.bid = bid
  next()
}

// Get all
router.get('/', async (req, res) => {
  try {
    const bids = await Bid.find()
    res.json(bids)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one
router.get('/:id', getBid, (req, res) => {
  res.json(res.bid)
})

// Create one
router.post('/', async (req, res) => {
  const bid = new Bid({
    bidId: req.body.bidId,
    title: req.body.title,
    fund: req.body.fund,
    amount: req.body.amount,
  })
  try {
    const newBid = await bid.save()
    res.status(200).json(newBid)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete
router.delete('/:id', getBid, async (req, res) => {
  try {
    await res.bid.remove()
    return res.status(200).json({ message: 'Bid deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
