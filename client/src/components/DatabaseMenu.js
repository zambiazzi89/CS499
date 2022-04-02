import React, { useRef, useState } from 'react'
import axios from 'axios'
import './DatabaseMenu.css'
import { DatabasePopUp } from './DatabasePopUp'
import { ErrorPopUp } from './ErrorPopUp'

export const DatabaseMenu = ({ setData }) => {
  const [showFindInput, setShowFindInput] = useState(false)
  const [showDeleteInput, setShowDeleteInput] = useState(false)
  const [showUpdateInput, setShowUpdateInput] = useState(false)
  const [databasePopUp, setDatabasePopUp] = useState(false)
  const [errorPopUp, setErrorPopUp] = useState(false)
  const [selectedBid, setSelectedBid] = useState({})
  const [databaseOperation, setDatabaseOperation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    const res = await axios.get(`/bids/${bidId}`).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage(error.message)
      }
      setErrorPopUp(true)
    })
    if (res) {
      setData([res.data])
    }
    setShowFindInput(false)
  }
  const handleDeleteBid = async () => {
    const bidId = deleteInputRef.current.value
    deleteInputRef.current.value = ''
    await axios
      .delete(`/bids/${bidId}`)
      .then(loadAllBids())
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage(error.message)
        }
        setErrorPopUp(true)
      })
  }

  const handleCreateBid = async (bid) => {
    await axios
      .post('/bids', bid)
      .then(loadAllBids())
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage(error.message)
        }
        setErrorPopUp(true)
      })
  }
  const handleUpdateBid = async (bid) => {
    await axios
      .put(`/bids/${bid.bidId}`, bid)
      .then(loadAllBids())
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage(error.message)
        }
        setErrorPopUp(true)
      })
  }

  const handleDatabasePopUp = async (e, operation) => {
    setShowFindInput(false)
    setShowUpdateInput(false)
    setShowDeleteInput(false)
    setDatabaseOperation(operation)
    e.preventDefault()
    const bidId = updateInputRef.current.value
    updateInputRef.current.value = ''
    const res = await axios.get(`/bids/${bidId}`).catch((error) => {
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage(error.message)
      }
      setErrorPopUp(true)
    })
    if (res) {
      setSelectedBid(res.data)
      setDatabasePopUp(true)
    }
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
      {errorPopUp && (
        <ErrorPopUp setErrorPopUp={setErrorPopUp} errorMessage={errorMessage} />
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
