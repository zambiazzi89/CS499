// Linked list Node to hold a Bid
// If no bid is passed as argument, defaults to null
class Node {
  constructor(bid = null) {
    this.bid = bid
    this.next = null
  }
}

// Linked List class definition
export class LinkedList {
  // Private field: size
  #size

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  // Checks if either head or tail is null while the other is not
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

  // Insert a new node holding a bid at the end of the linked list
  append(bid) {
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

  // Insert a new node holding a bid at the beginning of the linked list
  prepend(bid) {
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

  printList() {
    const result = []
    let current = this.head
    while (current !== null) {
      result.push(current.bid)
      current = current.next
    }
    return result
  }

  removeBid(bidId) {
    let found = false
    let succeedingNode
    // checks that head is not null
    if (this.head != null) {
      // if bidId is the head node
      if (this.head.bid.bidId === bidId) {
        found = true
        // if only head exists, deletes head and sets head and tail to null
        if (this.head.next === null) {
          this.head = null
          this.tail = null
        } else {
          //else, there are more nodes
          succeedingNode = this.head.next // assigns the succeeding node to succeedingNode
          this.head = succeedingNode // succeeding node is the new head
        }
      } else {
        // bidId is not the head node

        let current = this.head

        while (current != null) {
          if (current.next?.bid.bidId === bidId) {
            found = true
            succeedingNode = current.next
            // links current node to the node after succeedingNode
            current.next = succeedingNode.next
            break
          }
          current = current.next // move current to the next node to loop
        }
      }
      if (found === true) {
        this.size-- //decreases size
        if (this.size === 0 || this.size === 1) {
          this.tail = this.head
        }
        return this.printList()
      }
    }
    return false
  }

  findBid(bidId) {
    let current = this.head

    while (current !== null) {
      if (current.bid.bidId === bidId) {
        break
      }
      current = current.next
    }

    // if the while loop ends and no node is matched, returns empty bid
    if (current === null) {
      return false
    }

    return current.bid
  }

  getSize() {
    console.log(this.size)
  }
}
