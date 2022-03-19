import React, { useRef, useState } from 'react'
import { Bid } from '../DataStructures/BidClass'
import './OperationMenu.css'
import { LinkedList } from '../DataStructures/LinkedList'
import { BinarySearchTree } from '../DataStructures/BinarySearchTree'
import { HashTable } from '../DataStructures/HashTable'
import { CustomArray } from '../DataStructures/CustomArray'
import { PopUp } from './PopUp'

export const OperationMenu = ({
  data,
  loading,
  dataStructure,
  setDataStructure,
  loadedData,
  setLoadedData,
  setDisplayData,
  setTimeElapsed,
}) => {
  /*
   * Use reference Hooks for the data structures
   * This allows them to hold the state when the component is re-rendered
   * Data structure values will be accessible through the .current property
   */
  const array = useRef(null)
  const linkedList = useRef(null)
  const hashTable = useRef(null)
  const binarySearchTree = useRef(null)

  /*
   * useState Hooks are used to hold the state of specific variables used in operations
   * traversal: identify the traversal option (pre-, in-, or post-order traversal) selected by the user
   * popUp: open or close the PopUp component
   * operation: define if PopUp component should be used to find or remove a bid
   */
  const [traversal, setTraversal] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [operation, setOperation] = useState('')

  /*
   * Initialize variables to hold the CSV data
   * Perform operations to split the values into rows and columns
   * As well as trimming whitespaces from the edges of the values
   */
  let rows = []
  let rowsAndColumns = []
  let bidsArray = []
  if (!loading) {
    rows = data.split('\n')
    // Skip column headers at Index 0
    rowsAndColumns = rows
      .slice(1)
      .map((row) => row.split(',').map((col) => col.trim()))
    bidsArray = rowsAndColumns.map(
      (row) => new Bid(row[1], row[0], row[8], row[4])
    )
  }

  /*
   * handleLoad()
   * Initialize the selected data structure
   * Load values from the bid dataset
   * Inform that data was loaded
   * Calculate performance in ms
   */
  const handleLoad = () => {
    const timeStart = performance.now()
    switch (dataStructure) {
      case 'Array':
        array.current = new CustomArray(bidsArray)
        setLoadedData(true)
        break
      case 'Linked List':
        linkedList.current = new LinkedList()
        bidsArray.forEach((bid) => linkedList.current.appendBid(bid))
        setLoadedData(true)
        break
      case 'Hash Table':
        hashTable.current = new HashTable()
        bidsArray.forEach((bid) => hashTable.current.insertBid(bid))
        setLoadedData(true)
        break
      case 'Binary Search Tree':
        binarySearchTree.current = new BinarySearchTree()
        bidsArray.forEach((bid) => binarySearchTree.current.insertBid(bid))
        setLoadedData(true)
        break
      default:
        alert('No data structure found')
    }
    setTimeElapsed(performance.now() - timeStart)
  }

  /*
   * handleDisplay()
   * Parameter (optional): traversal option, defaults to empty string
   * Perform operations only if data has been loaded
   * Send all Bids in the selected data structure to the displayData variable
   * If Binary Search Tree, user must have identified traversal order
   * Alert user of any error
   * Calculate performance in ms
   */
  const handleDisplay = (traversal = '') => {
    if (loadedData) {
      const timeStart = performance.now()
      let result = []
      switch (dataStructure) {
        case 'Array':
          result = array.current.array
          break
        case 'Linked List':
          result = linkedList.current.printList()
          break
        case 'Hash Table':
          result = hashTable.current.printAll()
          break
        case 'Binary Search Tree':
          if (traversal === 'pre-order') {
            result = binarySearchTree.current.preOrderTraversal()
          } else if (traversal === 'in-order') {
            result = binarySearchTree.current.inOrderTraversal()
          } else if (traversal === 'post-order') {
            result = binarySearchTree.current.postOrderTraversal()
          } else alert('Incorrect Traversal value')
          break
        default:
          alert('No data structure found')
      }
      setDisplayData(result)
      setTimeElapsed(performance.now() - timeStart)
    }
  }

  /*
   * handleFindPopUp()
   * Set operation to 'find' and popUp to true
   * This makes the PopUp component visible
   */
  const handleFindPopUp = () => {
    setOperation('find')
    setPopUp(true)
  }

  /*
   * handleFind()
   * Parameter: bidId of the bid to be found
   * This function is passed to the PopUp component
   * It is executed when users press the "Submit" button
   * Search the bid in the selected data structure
   * Alert user of any errors
   * If bid is not found, change "operation" from "find" to "error"
   * This will display a message in the PopUp component informing the user
   * Calculate performance in ms
   */
  const handleFind = (bidId) => {
    const timeStart = performance.now()
    let result = []
    switch (dataStructure) {
      case 'Array':
        result = array.current.findBid(bidId)
        break
      case 'Linked List':
        result = linkedList.current.findBid(bidId)
        break
      case 'Hash Table':
        result = hashTable.current.findBid(bidId)
        break
      case 'Binary Search Tree':
        result = binarySearchTree.current.findBid(bidId)
        break
      default:
        alert('No data structure found')
    }
    if (result === false) {
      setOperation('error')
      return false
    } else {
      setDisplayData([result])
    }
    setTimeElapsed(performance.now() - timeStart)
    setOperation('')
    return true
  }

  /*
   * handleRemovePopUp()
   * Set operation to 'remove' and popUp to true
   * This makes the PopUp component visible
   */
  const handleRemovePopUp = () => {
    setOperation('remove')
    setPopUp(true)
  }

  /*
   * handleRemove()
   * Parameter: bidId of the bid to be removed
   * This function is passed to the PopUp component
   * It is executed when users press the "Submit" button
   * Search the bid in the selected data structure
   * Alert user of any errors
   * If bid is not found, change "operation" from "remove" to "error"
   * This will display a message in the PopUp component informing the user
   * Calculate performance in ms
   */
  const handleRemove = (bidId) => {
    const timeStart = performance.now()
    let result = []
    switch (dataStructure) {
      case 'Array':
        result = array.current.removeBid(bidId)
        break
      case 'Linked List':
        result = linkedList.current.removeBid(bidId)
        break
      case 'Hash Table':
        result = hashTable.current.removeBid(bidId)
        break
      case 'Binary Search Tree':
        result = binarySearchTree.current.removeBid(bidId)
        if (result === true) {
          if (traversal === 'pre-order') {
            result = binarySearchTree.current.preOrderTraversal()
          } else if (traversal === 'in-order') {
            result = binarySearchTree.current.inOrderTraversal()
          } else if (traversal === 'post-order') {
            result = binarySearchTree.current.postOrderTraversal()
          } else alert('Incorrect Traversal value')
          break
        }
        break
      default:
        alert('No data structure found')
    }
    if (result === false) {
      setOperation('error')
      return false
    } else {
      setDisplayData(result)
    }
    setTimeElapsed(performance.now() - timeStart)
    setOperation('')
    return true
  }

  /*
   * handleArraySort()
   * Parameter: type of array sorting algorithm
   * Implemented options: 'quick' and 'selection'
   */
  const handleArraySort = (type) => {
    if (loadedData) {
      const timeStart = performance.now()
      let result = []
      switch (type) {
        case 'selection':
          result = array.current.selectionSort()
          break
        case 'quick':
          result = array.current.quickSort()
          break
        default:
          alert('Incorrect Sorting Type')
      }
      setDisplayData(result)
      setTimeElapsed(performance.now() - timeStart)
    }
  }

  /*
   * handleExit()
   * Called when "Exit" button is clicked
   * Clears all data structures and Hooks
   */
  const handleExit = () => {
    array.current = null
    linkedList.current = null
    hashTable.current = null
    binarySearchTree.current = null
    setDataStructure('')
    setLoadedData(false)
    setDisplayData('')
    setTimeElapsed(0)
  }

  /*
   * return(): Components to be rendered
   * Menu to be displayed
   * Options vary according to the data structure selected
   * Buttons become active once data is loaded
   */
  return (
    <div className="operation-menu">
      {popUp && (
        <PopUp
          operation={operation}
          setPopUp={setPopUp}
          handleFind={handleFind}
          handleRemove={handleRemove}
        />
      )}
      <div className="data-structure-title">{dataStructure}</div>
      <div className="active-operation-button" onClick={handleLoad}>
        Load Bids
      </div>
      {dataStructure === 'Binary Search Tree' ? (
        <>
          <div
            className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
            onClick={() => {
              setTraversal('pre-order')
              handleDisplay('pre-order')
            }}
          >
            Pre-Order Traversal
          </div>
          <div
            className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
            onClick={() => {
              setTraversal('in-order')
              handleDisplay('in-order')
            }}
          >
            In-Order Traversal
          </div>
          <div
            className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
            onClick={() => {
              setTraversal('post-order')
              handleDisplay('post-order')
            }}
          >
            Post-Order Traversal
          </div>
        </>
      ) : (
        <div
          className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
          onClick={handleDisplay}
        >
          Display Bids
        </div>
      )}
      <div
        className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
        onClick={handleFindPopUp}
      >
        Find Bid
      </div>
      <div
        className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
        onClick={handleRemovePopUp}
      >
        Remove Bid
      </div>
      {dataStructure === 'Array' && (
        <>
          <div
            className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
            onClick={() => handleArraySort('selection')}
          >
            Selection Sort
          </div>
          <div
            className={`${loadedData ? 'active' : 'inactive'}-operation-button`}
            onClick={() => handleArraySort('quick')}
          >
            Quick Sort
          </div>
          <div className={`inactive-operation-button`}>Merge Sort</div>
        </>
      )}
      {dataStructure === 'Linked List' && (
        <div className={'inactive-operation-button'}>Reverse List</div>
      )}
      {dataStructure === 'Hash Table' && (
        <div className={'inactive-operation-button'}>Set Hash Key</div>
      )}
      <div className="active-operation-button" onClick={handleExit}>
        Exit
      </div>
    </div>
  )
}
