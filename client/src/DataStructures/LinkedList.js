/*
 * Node class is used to build the Linked List
 * The bid field holds a Bid class
 * The next field act as "pointer" to another Node
 * When arguments are not provided, they default to null
 */
class Node {
  constructor(bid = null) {
    this.bid = bid
    this.next = null
  }
}

/*
 * Linked List
 * Private field: #size
 * Public field: head, tail, size
 * Public methods: insertBid(), printAll(), removeBid(), findBid()
 */
export class LinkedList {
  #size

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  /**
   * Check if either head or tail are null while the other is not
   */
  checkHeadTail() {
    if (
      (this.head === null && this.tail !== null) ||
      (this.head !== null && this.tail === null)
    ) {
      throw new Error(
        'Corrupted Linked List: Head or tail is null but the other is not.'
      )
    }
  }

  /**
   * Insert a new node holding a bid at the end of the linked list
   * @param {Bid} bid Bid to be appended
   */
  appendBid(bid) {
    const node = new Node(bid)
    this.checkHeadTail()
    if (this.tail !== null) {
      this.tail.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.size++
  }

  /**
   * Insert a new node holding a bid at the beginning of the linked list
   * @param {Bid} bid Bid to be prepended
   */
  prependBid(bid) {
    const node = new Node(bid)
    this.checkHeadTail()
    if (this.head !== null) {
      node.next = this.head
    } else {
      this.tail = node
    }
    this.head = node
    this.size++
  }

  /**
   * Iterate through the linked list adding bids to the result array
   * @returns result array
   */
  printList() {
    const result = []
    let current = this.head
    while (current !== null) {
      result.push(current.bid)
      current = current.next
    }
    return result
  }

  /**
   * Search and remove Bid with matching bidId
   * @param {string} bidId bidId of the Bid to be removed
   * @returns all bids if Bid is found, or false otherwise
   */
  removeBid(bidId) {
    let found = false
    let succeedingNode
    if (this.head != null) {
      // Check that head is not null
      if (this.head.bid.bidId === bidId) {
        // If bidId is the head node
        found = true
        if (this.head.next === null) {
          // if only head exists, deletes head and sets head and tail to null
          this.head = null
          this.tail = null
        } else {
          /**
           * Else, there are more nodes
           * Assign the succeeding node to succeedingNode
           * And succeedingNode becomes the new head
           */
          succeedingNode = this.head.next
          this.head = succeedingNode
        }
      } else {
        // Else, bidId is not the head node
        let current = this.head
        while (current != null) {
          if (current.next?.bid.bidId === bidId) {
            found = true
            succeedingNode = current.next
            // Link current node to the node after succeedingNode
            current.next = succeedingNode.next
            break
          }
          // Move current to the next node to loop
          current = current.next
        }
      }
      if (found === true) {
        this.size--
        if (this.size === 0 || this.size === 1) {
          this.tail = this.head
        }
        return this.printList()
      }
    }
    return false
  }

  /**
   * Search and get Bid with matching bidId
   * @param {string} bidId bidId of the Bid to be found
   * @returns Bid if it is found, false otherwise
   */
  findBid(bidId) {
    let current = this.head
    while (current !== null) {
      if (current.bid.bidId === bidId) {
        break
      }
      current = current.next
    }
    // if the while loop ends and no node is matched, return false
    if (current === null) {
      return false
    }
    // bidId is found, return Bid
    return current.bid
  }

  reverseLinkedList() {
    let previous = null
    let current = this.head
    let next = null
    while (current !== null) {
      next = current.next
      current.next = previous
      previous = current
      current = next
    }
    this.head = previous
    return this.printList()
  }
}
