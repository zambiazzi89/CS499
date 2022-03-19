/*
 * Bid class is used to store the values of bids
 * When arguments are not provided, they default to empty strings
 */

export class Bid {
  constructor(bidId = '', title = '', fund = '', amount = '') {
    this.bidId = bidId
    this.title = title
    this.fund = fund
    this.amount = amount
  }
}
