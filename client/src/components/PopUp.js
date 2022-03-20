import React, { useEffect, useRef } from 'react'
import './PopUp.css'

export const PopUp = ({
  operation,
  setPopUp,
  handleFind,
  handleRemove,
  handleSetHashSalt,
}) => {
  // Create ref for the box to handle click outsite of it (closes box)
  const boxRef = useRef()
  // Create inputRef to handle submit
  const inputRef = useRef()

  // Set label based on the operation argument
  let label = ''
  let placeholder = ''
  if (operation === 'find') {
    label = 'FIND A BID'
    placeholder = 'Enter a Bid ID'
  } else if (operation === 'remove') {
    label = 'REMOVE A BID'
    placeholder = 'Enter a Bid ID'
  } else if (operation === 'set-hash-salt') {
    label = 'SET HASH SALT'
    placeholder = 'Enter a number'
  } else if (operation === 'error') {
    label = 'ERROR'
  }

  // useEffect contains click, touch, and key event listeners
  useEffect(() => {
    // Closes PopUp if user clicks outside the "popup-box" element
    const clickListener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!boxRef.current || boxRef.current.contains(event.target)) {
        return
      }
      setPopUp(false)
    }
    // Closes PopUp if user presses Esc
    const keyPressListener = (event) => {
      if (event.key === 'Escape') {
        setPopUp(false)
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

  /*
   * handleSubmit()
   * If bid was found, execute the handleFind or handleRemove functions according to the 'operation'
   * Else, if bid was not found, display message to the user
   * After the error message is displayed, user can click on "OK" to close the PopUp
   */
  const handleSubmit = (e) => {
    if (operation !== 'error') {
      e.preventDefault()
      const input = inputRef.current.value
      let result = false
      if (operation === 'find') {
        result = handleFind(input)
      } else if (operation === 'remove') {
        result = handleRemove(input)
      } else if (operation === 'set-hash-salt') {
        result = handleSetHashSalt(input)
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
            <input autoFocus placeholder={placeholder} ref={inputRef} />
            <div className="popup-button" onClick={handleSubmit}>
              SUBMIT
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
