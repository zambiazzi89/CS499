import React, { useRef, useState } from 'react'
import axios from 'axios'
import './DatabaseMenu.css'
import { DatabasePopUp } from './DatabasePopUp'

export const DatabaseMenu = ({ setData }) => {
  const [showFindInput, setShowFindInput] = useState(false)
  const [showDeleteInput, setShowDeleteInput] = useState(false)
  const [showUpdateInput, setShowUpdateInput] = useState(false)
  const [databasePopUp, setDatabasePopUp] = useState(false)
  const [selectedBid, setSelectedBid] = useState({})
  const [databaseOperation, setDatabaseOperation] = useState('')

  const findInputRef = useRef()
  const deleteInputRef = useRef()
  const updateInputRef = useRef()

  const loadAllBids = async () => {
    setShowFindInput(false)
    setShowDeleteInput(false)
    const { data } = await axios.get('/bids')
    setData(data)
  }

  const handleFindBid = async (e) => {
    e.preventDefault()
    const bidId = findInputRef.current.value
    findInputRef.current.value = ''
    const { data } = await axios.get(`/bids/${bidId}`)
    setData([data])
    setShowFindInput(false)
  }
  const handleDeleteBid = async () => {
    const bidId = deleteInputRef.current.value
    deleteInputRef.current.value = ''
    await axios.delete(`/bids/${bidId}`)
    loadAllBids()
  }

  const handleCreateBid = async (bid) => {
    await axios.post('/bids', bid)
    loadAllBids()
  }
  const handleUpdateBid = async (bid) => {
    await axios.put(`/bids/${bid.bidId}`, bid)
    loadAllBids()
  }

  const handleDatabasePopUp = async (e, operation) => {
    setShowFindInput(false)
    setShowUpdateInput(false)
    setShowDeleteInput(false)
    setDatabaseOperation(operation)
    e.preventDefault()
    const bidId = updateInputRef.current.value
    updateInputRef.current.value = ''
    const { data } = await axios.get(`/bids/${bidId}`)
    setSelectedBid(data)
    setDatabasePopUp(true)
  }

  return (
    <div className="database-menu-container">
      {databasePopUp && (
        <DatabasePopUp
          setDatabasePopUp={setDatabasePopUp}
          selectedBid={selectedBid}
          databaseOperation={databaseOperation}
          handleCreateBid={handleCreateBid}
          handleUpdateBid={handleUpdateBid}
        />
      )}
      <div className="db-menu-title">Database Menu</div>
      <div className="db-button" onClick={loadAllBids}>
        Load All Bids
      </div>
      <div
        className="db-button"
        onClick={(e) => handleDatabasePopUp(e, 'create')}
      >
        Create Bid
      </div>
      <div
        className="db-button"
        onClick={() => {
          setShowFindInput(true)
          setShowDeleteInput(false)
          setShowUpdateInput(false)
        }}
      >
        Find Bid
      </div>
      <form onSubmit={handleFindBid}>
        <div className={`bid-input ${showFindInput ? 'active' : 'inactive'}`}>
          <input placeholder="Enter Bid Id" ref={findInputRef} />
          <div onClick={handleFindBid}>OK</div>
        </div>
      </form>
      <div
        className="db-button"
        onClick={() => {
          setShowUpdateInput(true)
          setShowFindInput(false)
          setShowDeleteInput(false)
        }}
      >
        Update Bid
      </div>
      <form onSubmit={(e) => handleDatabasePopUp(e, 'update')}>
        <div className={`bid-input ${showUpdateInput ? 'active' : 'inactive'}`}>
          <input placeholder="Enter Bid Id" ref={updateInputRef} />
          <div onClick={(e) => handleDatabasePopUp(e, 'update')}>OK</div>
        </div>
      </form>
      <div
        className="db-button"
        onClick={() => {
          setShowDeleteInput(true)
          setShowFindInput(false)
          setShowUpdateInput(false)
        }}
      >
        Delete Bid
      </div>
      <form onSubmit={handleDeleteBid}>
        <div className={`bid-input ${showDeleteInput ? 'active' : 'inactive'}`}>
          <input placeholder="Enter Bid Id" ref={deleteInputRef} />
          <div onClick={handleDeleteBid}>OK</div>
        </div>
      </form>
    </div>
  )
}
