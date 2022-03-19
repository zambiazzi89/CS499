class Node {
  constructor(bid = null, left = null, right = null) {
    this.bid = bid
    this.left = left
    this.right = right
  }
}

export class BinarySearchTree {
  #root
  #addNode(node, bid) {
    // if node is larger than the bid, add to left subtree
    if (node.bid.bidId > bid.bidId) {
      if (node.left === null) {
        node.left = new Node(bid)
      } else {
        this.#addNode(node.left, bid)
      }
    }

    // add to the right subtree
    else {
      if (node.right === null) {
        node.right = new Node(bid)
      } else {
        this.#addNode(node.right, bid)
      }
    }
  }

  #removeNode(node, bidId) {
    // If this node is null then return (avoid crashing)
    if (node === null) {
      return null
    }

    // Recurse down left and right subtrees
    if (bidId < node.bid.bidId) {
      node.left = this.#removeNode(node.left, bidId)
    } else if (bidId > node.bid.bidId) {
      node.right = this.#removeNode(node.right, bidId)

      // Else Node is found
    } else {
      // Node has no children (leaf)
      if (node.left === null && node.right === null) {
        node = null
      }
      // One child to the left
      else if (node.left != null && node.right === null) {
        node = node.left
      }
      // One child to the right
      else if (node.left === null && node.right != null) {
        node = node.right
      }
      // Two children
      else {
        let temp = node.right
        while (temp.left != null) {
          temp = temp.left
        }
        node.bid = temp.bid
        node.right = this.#removeNode(node.right, temp.bid.bidId)
      }
    }
    return node
  }

  constructor() {
    this.#root = null
  }

  /* ==================== INSERT ====================
   * Loops until we get to an empty node
   * If value is less than current node value, we move to the left child
   * Else, if value is greater than current node value, we move to the right child
   * Else, the value is duplicate, could be implemented with 'count' property
   */
  insert(bid) {
    this.#root === null
      ? (this.#root = new Node(bid))
      : this.#addNode(this.#root, bid)
  }

  removeBid(bidId) {
    const node = this.#removeNode(this.#root, bidId)
    if (node === null) {
      return false
    }
    return true
  }

  findBid(bidId) {
    let current = this.#root

    while (current !== null) {
      // If current node matches, return it
      if (current.bid.bidId === bidId) {
        return current.bid
      }
      // If bid is smaller than current then traverse left
      if (bidId < current.bid.bidId) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return false
  }

  preOrderTraversal(node = this.#root) {
    if (node === null) return []
    else {
      return [
        node.bid,
        ...this.inOrderTraversal(node.left),
        ...this.inOrderTraversal(node.right),
      ]
    }
  }
  inOrderTraversal(node = this.#root) {
    if (node === null) return []
    else {
      return [
        ...this.inOrderTraversal(node.left),
        node.bid,
        ...this.inOrderTraversal(node.right),
      ]
    }
  }
  postOrderTraversal(node = this.#root) {
    if (node === null) return []
    else {
      return [
        ...this.inOrderTraversal(node.left),
        ...this.inOrderTraversal(node.right),
        node.bid,
      ]
    }
  }
}
