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
  setErrorData,
  setTimeElapsed,
}) => {
  const array = useRef(null)
  const linkedList = useRef(null)
  const hashTable = useRef(null)
  const binarySearchTree = useRef(null)

  const [traversal, setTraversal] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [operation, setOperation] = useState('')

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

  const handleLoad = () => {
    const timeStart = performance.now()
    switch (dataStructure) {
      case 'Array':
        array.current = new CustomArray(bidsArray)
        setLoadedData(true)
        break
      case 'Linked List':
        linkedList.current = new LinkedList()
        bidsArray.forEach((bid) => linkedList.current.append(bid))
        setLoadedData(true)
        break
      case 'Hash Table':
        hashTable.current = new HashTable()
        bidsArray.forEach((bid) => hashTable.current.insert(bid))
        setLoadedData(true)
        break
      case 'Binary Search Tree':
        binarySearchTree.current = new BinarySearchTree()
        bidsArray.forEach((bid) => binarySearchTree.current.insert(bid))
        setLoadedData(true)
        break
      default:
        alert('No data structure found')
    }

    setTimeElapsed(performance.now() - timeStart)
  }

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

  const handleFindPopUp = () => {
    setOperation('find')
    setPopUp(true)
  }
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
      setErrorData('')
      setDisplayData([result])
    }
    setTimeElapsed(performance.now() - timeStart)
    setOperation('')
    return true
  }

  const handleRemovePopUp = () => {
    setOperation('remove')
    setPopUp(true)
  }

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
      setErrorData('')
      setDisplayData(result)
    }
    setTimeElapsed(performance.now() - timeStart)
    setOperation('')
    return true
  }

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
        </>
      )}
      {dataStructure === 'Linked List' && (
        <div className={'inactive-operation-button'}>Reverse List</div>
      )}
      <div className="active-operation-button" onClick={handleExit}>
        Exit
      </div>
    </div>
  )
}
