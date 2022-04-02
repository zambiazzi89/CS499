import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './DatabaseScreen.css'
import { DatabaseMenu } from '../components/DatabaseMenu'

export const DatabaseScreen = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('bids')
      setData(res.data)
    }
    fetchData()
    return () => setData([])
  }, [])
  return (
    <div className="database-screen-container">
      <DatabaseMenu />
      <div className="db-data-container">
        {data.length === 0 && <div>Loading...</div>}
        <div>
          {data.map((bid) => (
            <div key={bid.bidId} className="dataset-row">
              Bid ID: {bid.bidId}, Title: {bid.title}, Fund: {bid.fund}, Amount:{' '}
              {bid.amount}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
