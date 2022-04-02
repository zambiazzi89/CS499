import React, { useEffect, useRef } from 'react'
import './DatabasePopUp.css'

export const DatabasePopUp = ({
  setDatabasePopUp,
  selectedBid,
  databaseOperation,
  handleCreateBid,
  handleUpdateBid,
}) => {
  // Create ref for the box to handle click outsite of it (closes box)
  const boxRef = useRef()
  // Create inputRef to handle submit
  const bidIdRef = useRef()
  const titleRef = useRef()
  const fundRef = useRef()
  const amountRef = useRef()

  // useEffect contains click, touch, and key event listeners
  useEffect(() => {
    // Closes PopUp if user clicks outside the "popup-box" element
    const clickListener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!boxRef.current || boxRef.current.contains(event.target)) {
        return
      }
      setDatabasePopUp(false)
    }
    // Closes PopUp if user presses Esc
    const keyPressListener = (event) => {
      if (event.key === 'Escape') {
        setDatabasePopUp(false)
      }
    }

    document.addEventListener('mouseup', clickListener)
    document.addEventListener('touchend', clickListener)
    document.addEventListener('keydown', keyPressListener)

    // Remove event listeners when component unmounts
    return () => {
      document.removeEventListener('mouseup', clickListener)
      document.removeEventListener('touchend', clickListener)
      document.removeEventListener('keydown', keyPressListener)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const bid = {
      title: titleRef.current.value,
      fund: fundRef.current.value,
      amount: amountRef.current.value,
    }
    if (databaseOperation === 'create') {
      bid.bidId = bidIdRef.current.value
      handleCreateBid(bid)
    } else if (databaseOperation === 'update') {
      bid.bidId = selectedBid.bidId
      handleUpdateBid(bid)
    }
    setDatabasePopUp(false)
  }
  return (
    <div className="database-popup-background">
      <form onSubmit={handleSubmit}>
        <div className="database-popup-box" ref={boxRef}>
          {databaseOperation === 'update' ? (
            <div>UPDATE BID: {selectedBid.bidId}</div>
          ) : (
            <>
              <div>CREATE BID</div>
              <input
                autoFocus={databaseOperation === 'create'}
                placeholder="Bid ID"
                ref={bidIdRef}
              />
            </>
          )}
          <input
            autoFocus={databaseOperation === 'update'}
            placeholder="Title"
            ref={titleRef}
            defaultValue={
              databaseOperation === 'update' ? selectedBid.title : ''
            }
          />
          <input
            placeholder="Fund"
            ref={fundRef}
            defaultValue={
              databaseOperation === 'update' ? selectedBid.fund : ''
            }
          />
          <input
            placeholder="Amount"
            ref={amountRef}
            defaultValue={
              databaseOperation === 'update' ? selectedBid.amount : ''
            }
          />

          <button
            className="database-popup-button"
            onClick={handleSubmit}
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  )
}
