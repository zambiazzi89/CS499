const DEFAULT_SIZE = 179

class Node {
  constructor(bid = null, key = Number.MAX_SAFE_INTEGER, next = null) {
    this.bid = bid
    this.key = key
    this.next = next
  }
}

export class HashTable {
  #tableSize
  #nodes
  #hash(key) {
    return key % this.#tableSize
  }

  constructor(size = DEFAULT_SIZE) {
    this.#tableSize = size
    this.#nodes = new Array(size).fill(null)
  }

  /**
   * Insert a bid
   *
   * @param bid The bid to insert
   */
  insert(bid) {
    // Create key when inserting bid
    const key = this.#hash(Number(bid.bidId))

    // Try and retrieve node using the key
    let oldNode = this.#nodes[key]

    // If no entry is found for the key
    if (oldNode === null) {
      this.#nodes[key] = new Node(bid, key)
    } else {
      // Node found
      // If node has not been used
      if (oldNode.key === Number.MAX_SAFE_INTEGER) {
        oldNode.key = key
        oldNode.bid = bid
        oldNode.next = null
      } else {
        // There is a Node with value, must find next open node (last one)
        while (oldNode.next !== null) {
          oldNode = oldNode.next
        }
        oldNode.next = new Node(bid, key)
      }
    }
  }
  /**
   * Print all bids
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
   * Remove a bid
   *
   * @param bidId The bid id to search for
   */
  removeBid(bidId) {
    // Calculate the key for the bid
    const key = this.#hash(Number(bidId))

    // Try and retrieve the node using the key
    let node = this.#nodes[key]

    // If node is null or unused, return empty bid
    if (node === null || node.key === Number.MAX_SAFE_INTEGER) {
      return false
    }

    // Walk the linked list to find the matching node
    while (node !== null) {
      // If node found is not unused and matches bidId
      if (node.key !== Number.MAX_SAFE_INTEGER && node.bid.bidId === bidId) {
        this.#nodes[key] = this.#nodes[key].next
        return this.printAll()
      }
      node = node.next
    }

    return false
  }

  /**
   * Search for the specified bidId
   *
   * @param bidId The bid id to search for
   */
  findBid(bidId) {
    // Calculate the key for the bid
    const key = this.#hash(Number(bidId))

    // Try and retrieve the node using the key
    let node = this.#nodes[key]

    // If node is null or unused, return empty bid
    if (node === null || node.key === Number.MAX_SAFE_INTEGER) {
      return false
    }

    // Walk the linked list to find the matching node
    while (node !== null) {
      // If node found is not unused and matches bidId
      if (node.key !== Number.MAX_SAFE_INTEGER && node.bid.bidId === bidId) {
        return node.bid
      }
      node = node.next
    }

    return false
  }
}
