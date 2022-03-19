import React from 'react'
import './DataDisplay.css'

export const DataDisplay = ({ loadedData, displayData, timeElapsed }) => {
  return (
    <div className="data-container">
      {!loadedData && !displayData && (
        <div className="no-dataset-message">
          No dataset has been loaded yet...
        </div>
      )}
      {loadedData && !displayData && (
        <div>
          <div className="dataset-row">Time elapsed: {timeElapsed} ms</div>
          <div className="dataset-row">Data loaded successfully.</div>
          <div className="no-dataset-message">
            Select option to display data...
          </div>
        </div>
      )}
      {loadedData && displayData && (
        <div>
          <div className="dataset-row">Time elapsed: {timeElapsed} ms</div>
          {displayData.map((bid) => (
            <div key={bid.bidId} className="dataset-row">
              Bid ID: {bid.bidId}, Title: {bid.title}, Fund: {bid.fund}, Amount:{' '}
              {bid.amount}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
