import React, { useEffect, useRef } from 'react'
import './PopUp.css'

export const PopUp = ({ operation, setPopUp, handleFind, handleRemove }) => {
  const boxRef = useRef()
  const inputRef = useRef()
  let label = ''
  if (operation === 'find') {
    label = 'FIND A BID'
  } else if (operation === 'remove') {
    label = 'REMOVE A BID'
  } else if (operation === 'error') {
    label = 'ERROR'
  }
  useEffect(() => {
    const clickListener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!boxRef.current || boxRef.current.contains(event.target)) {
        return
      }
      setPopUp(false)
    }
    const keyPressListener = (event) => {
      if (event.key === 'Escape') {
        setPopUp(false)
      }
    }

    document.addEventListener('mouseup', clickListener)
    document.addEventListener('touchend', clickListener)
    document.addEventListener('keydown', keyPressListener)
    return () => {
      document.removeEventListener('mouseup', clickListener)
      document.removeEventListener('touchend', clickListener)
      document.removeEventListener('keydown', keyPressListener)
    }
  })

  const handleSubmit = (e) => {
    if (operation !== 'error') {
      e.preventDefault()
      const bidId = inputRef.current.value
      let result = false
      if (operation === 'find') {
        result = handleFind(bidId)
      } else if (operation === 'remove') {
        result = handleRemove(bidId)
      }
      if (result) {
        setPopUp(false)
      } else {
        operation = 'error'
      }
    } else {
      setPopUp(false)
    }
  }
  return (
    <div className="popup-background">
      {operation === 'error' ? (
        <div className="popup-box" ref={boxRef}>
          <div>{label}</div>
          <div>No Bid with was found with this Bid ID.</div>
          <div className="popup-button" onClick={handleSubmit}>
            OK
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="popup-box" ref={boxRef}>
            <div>{label}</div>
            <input autoFocus placeholder="Enter a Bid ID" ref={inputRef} />
            <div className="popup-button" onClick={handleSubmit}>
              SUBMIT
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
