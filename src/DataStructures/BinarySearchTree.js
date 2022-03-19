/*
 * Node class is used to build the Binary Search Tree
 * The bid field holds a Bid class
 * The left and right fields act as "pointers" to other Nodes
 * When arguments are not provided, they default to null
 */
class Node {
  constructor(bid = null, left = null, right = null) {
    this.bid = bid
    this.left = left
    this.right = right
  }
}

/*
 * Binary Search Tree (BST)
 * Uses the Bids' bidId values to organize the BST structure
 * Private field: root
 * Private methods: addNode(), removeNode()
 * Public methods: insertBid(), removeBid(), findBid(), preOrderTraversal(),
 *                 inOrderTraversal(), postOrderTraversal()
 */

export class BinarySearchTree {
  #root

  /**
   * Private (recursive) function used by insertBid()
   * @param {Node} node Current Node
   * @param {Bid} bid Bid class to be inserted in a new Node
   */
  #addNode(node, bid) {
    // if node's bidId is larger than bid's, add to left subtree
    if (node.bid.bidId > bid.bidId) {
      if (node.left === null) {
        node.left = new Node(bid)
      } else {
        this.#addNode(node.left, bid)
      }
    }

    // else, add to the right subtree
    else {
      if (node.right === null) {
        node.right = new Node(bid)
      } else {
        this.#addNode(node.right, bid)
      }
    }
  }

  /**
   * Private (recursive) function used by removeBid()
   * @param {Node} node Current Node
   * @param {string} bidId bidId of the Node to be removed
   * @returns
   */
  #removeNode(node, bidId) {
    // If this node is null then return null
    if (node === null) {
      return null
    }

    // If bidId is smaller than node's, recurse down the left subtree
    // Else if bidId is greater than node's recurse down the right subtree
    // Else Node is found
    if (bidId < node.bid.bidId) {
      node.left = this.#removeNode(node.left, bidId)
    } else if (bidId > node.bid.bidId) {
      node.right = this.#removeNode(node.right, bidId)
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

  /**
   * Insert a Bid
   * If root is null, insert it at root, else call #addNode()
   * @param {Bid} bid Bid to be inserted
   */
  insertBid(bid) {
    this.#root === null
      ? (this.#root = new Node(bid))
      : this.#addNode(this.#root, bid)
  }

  /**
   * Search and remove Bid with matching bidId
   * Call removeNode() to recurse starting at the root
   * @param {string} bidId bidId of the Bid to be removed
   * @returns If removeNode returns null, the bidId was not found, return false, else, it was found, return true
   */
  removeBid(bidId) {
    const node = this.#removeNode(this.#root, bidId)
    if (node === null) {
      return false
    }
    return true
  }

  /**
   * Search and get the Bid with matching bidId
   * @param {string} bidId bidId of the Bid to be removed
   * @returns the bid if found, or false if not found
   */
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

  /**
   * Gets current bid, then recurse down left subtree, then recurse down the right subtree
   * @param {Node} node (optional): Starting node, defaults to the root
   * @returns Array with all bids
   */
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

  /**
   * Recurse down left subtree, then current node, then recurse down the right subtree
   * @param {Node} node (optional): Starting node, defaults to the root
   * @returns Array with all bids
   */
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

  /**
   * Recurse down left subtree, then recurse down the right subtree, then gets the current node
   * @param {Node} node (optional): Starting node, defaults to the root
   * @returns Array with all bids
   */
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
