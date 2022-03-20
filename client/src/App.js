import React, { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Body } from './components/Body'

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <div id="app" className={`App ${darkTheme ? 'dark' : 'light'}`}>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Body />
    </div>
  )
}

export default App
