import React from 'react'
import './DatabaseMenu.css'

export const DatabaseMenu = () => {
  return (
    <div className="database-menu-container">
      <div className="db-menu-title">Database Menu</div>
      <div className="db-button">Load All Bids</div>
      <div className="db-button">Find Bid</div>
      <div className="db-button">Delete Bid</div>
      <div className="db-button">Delete All Bids</div>
      <div className="db-button">Restore Original Bids</div>
    </div>
  )
}
