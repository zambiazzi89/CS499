import React, { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Body } from './components/Body'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('bids')

      console.log(res.data)
    }
    fetchData()
  })

  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <div id="app" className={`App ${darkTheme ? 'dark' : 'light'}`}>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Body />
    </div>
  )
}

export default App
