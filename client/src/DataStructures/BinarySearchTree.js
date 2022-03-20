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
   * Private recursive helper function used by #removeNode()
   * Search and get Node with minimum value of the subtree
   * @param {Node} node Current node
   * @returns Node
   */
  #findMinNode(node) {
    return node.left === null ? node : this.#findMinNode(node.left)
  }

  /**
   * Private recursive function used by removeBid()
   * @param {Node} node Current Node
   * @param {string} bidId bidId of the Node to be removed
   * @returns an object containing a node and status
   * status changes to true when a Node is removed, remains false when no Node is removed
   */
  #removeNode(node, bidId, status) {
    // If this node is null then return null
    if (node === null) {
      return { node: null, status: false }
    }

    // If bidId is smaller than node's, recurse down the left subtree
    // Else if bidId is greater than node's recurse down the right subtree
    // Else Node is found
    if (bidId < node.bid.bidId) {
      const result = this.#removeNode(node.left, bidId)
      node.left = result.node
      return { node: node, status: result.status }
    } else if (bidId > node.bid.bidId) {
      const result = this.#removeNode(node.right, bidId)
      node.right = result.node
      return { node: node, status: result.status }
    } else {
      if (node.left === null && node.right === null) {
        // Node has no children (leaf)
        node = null
      } else if (node.left != null && node.right === null) {
        // One child to the left
        node = node.left
      } else if (node.left === null && node.right != null) {
        // One child to the right
        node = node.right
      } else {
        // Two children
        const minRightSubTree = this.#findMinNode(node.right)
        node.bid = minRightSubTree.bid
        const result = this.#removeNode(node.right, minRightSubTree.bid.bidId)
        node.right = result.node
      }
      return { node: node, status: true }
    }
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
   * Call #removeNode() to recurse starting at the root
   * @param {string} bidId bidId of the Bid to be removed
   * @returns status property of the object returned by #removeNode()
   */
  removeBid(bidId) {
    const result = this.#removeNode(this.#root, bidId, false)
    return result.status
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
