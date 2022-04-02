import React, { useEffect, useRef } from 'react'
import './ErrorPopUp.css'

export const ErrorPopUp = ({ setErrorPopUp, errorMessage }) => {
  // Create ref for the box to handle click outsite of it (closes box)
  const boxRef = useRef()

  // useEffect contains click, touch, and key event listeners
  useEffect(() => {
    // Closes PopUp if user clicks outside the "popup-box" element
    const clickListener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!boxRef.current || boxRef.current.contains(event.target)) {
        return
      }
      setErrorPopUp(false)
    }
    // Closes PopUp if user presses Esc
    const keyPressListener = (event) => {
      if (event.key === 'Escape') {
        setErrorPopUp(false)
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

  return (
    <div className="error-popup-background">
      <div className="error-popup-box" ref={boxRef}>
        <div>Error</div>
        <div>{errorMessage}</div>
        <div
          className="error-popup-button"
          onClick={() => setErrorPopUp(false)}
        >
          OK
        </div>
      </div>
    </div>
  )
}
