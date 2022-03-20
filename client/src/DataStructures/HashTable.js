// Default size of the Hash Table
const DEFAULT_SIZE = 179

/*
 * Node class is used to build the Hash Table
 * The bid field holds a Bid class
 * The next field act as "pointer" to another Node
 * When arguments are not provided, they default to null
 * The key defaults to Number.MAX_SAFE_INTEGER
 */
class Node {
  constructor(bid = null, key = Number.MAX_SAFE_INTEGER, next = null) {
    this.bid = bid
    this.key = key
    this.next = next
  }
}

/*
 * Hash Table
 * Uses the Bids' bidId values to organize the Hash Table's structure
 * Private fields: #tableSize, #nodes
 * Private methods: #hash()
 * Public methods: insertBid(), printAll(), removeBid(), findBid()
 */
export class HashTable {
  #tableSize
  #nodes
  #collisions
  #hashSalt
  /**
   * Function to calculate the hash value based on a given key
   * @param {number} key
   * @returns
   */
  #hash(key) {
    let result = 0
    for (let i = 0; i < key.length; i++) {
      result += this.#hashSalt ** i * key.charCodeAt(i)
    }
    return result % this.#tableSize
  }

  constructor(salt = 17, size = DEFAULT_SIZE) {
    this.#tableSize = size
    this.#nodes = new Array(size).fill(null)
    this.#collisions = 0
    this.#hashSalt = salt
  }

  getCollisions() {
    return this.#collisions
  }

  getHashSalt() {
    return this.#hashSalt
  }
  setHashSalt(num) {
    this.#hashSalt = num
  }
  /**
   * Calculate the key based on the bid's bidId
   * If no entry is found for the key, create a new node with the Bid
   * Else: If Node has not been used, assign the Bid's values to it
   *       Else, the Node already has value, find the next open Node (last one)
   * @param {Bid} bid Bid to be inserted
   */
  insertBid(bid) {
    const key = this.#hash(bid.bidId)
    let oldNode = this.#nodes[key]
    if (oldNode === null) {
      this.#nodes[key] = new Node(bid, key)
    } else {
      if (oldNode.key === Number.MAX_SAFE_INTEGER) {
        oldNode.key = key
        oldNode.bid = bid
        oldNode.next = null
      } else {
        while (oldNode.next !== null) {
          oldNode = oldNode.next
          this.#collisions++
        }
        this.#collisions++
        oldNode.next = new Node(bid, key)
      }
    }
  }

  /**
   * Create a result array to store all bids
   * Iterate through the #nodes array containing all bids
   * If node is not null and has been used:
   *     Add node's Bid to the result, and move to the .next until it is null
   * @returns result array
   */
  printAll() {
    const result = []
    let currentNode
    for (let i = 0; i < this.#tableSize; i++) {
      currentNode = this.#nodes[i]
      // If node is not null and is not unused
      if (currentNode !== null && currentNode.key < Number.MAX_SAFE_INTEGER) {
        result.push(currentNode.bid)
        while (currentNode.next !== null) {
          currentNode = currentNode.next
          result.push(currentNode.bid)
        }
      }
    }
    return result
  }
  /**
   * Search and remove a Node with matching bidId
   * @param {string} bidId bidId of the Bid to be removed
   * @returns All bids if Bid is found, or false otherwise
   */
  removeBid(bidId) {
    // Calculate the key for the bid
    // If node is null or unused, return false
    const key = this.#hash(bidId)
    let node = this.#nodes[key]
    if (node === null || node.key === Number.MAX_SAFE_INTEGER) {
      return false
    }
    // Walk the linked list to find the matching node
    // If node found is not unused and matches bidId, return all bids
    while (node !== null) {
      if (node.key !== Number.MAX_SAFE_INTEGER && node.bid.bidId === bidId) {
        this.#nodes[key] = this.#nodes[key].next
        return this.printAll()
      }
      node = node.next
    }

    // If not bid is found, return false
    return false
  }

  /**
   * Search and get Bid with matching bidId
   * @param {string} bidId bidId of the Bid to be found
   * @returns Matchin Bid if it is found, or false otherwise
   */
  findBid(bidId) {
    // Calculate the key for the bid
    // If node is null or unused, return false
    const key = this.#hash(bidId)
    let node = this.#nodes[key]
    if (node === null || node.key === Number.MAX_SAFE_INTEGER) {
      return false
    }

    // Walk the linked list to find the matching node
    // If node found is not unused and matches bidId, return Bid
    while (node !== null) {
      if (node.key !== Number.MAX_SAFE_INTEGER && node.bid.bidId === bidId) {
        return node.bid
      }
      node = node.next
    }

    // If no Bid is found, return false
    return false
  }
}
