import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Body } from './components/Body'
import { DatabaseScreen } from './screens/DatabaseScreen'

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <BrowserRouter>
      <div id="app" className={`App ${darkTheme ? 'dark' : 'light'}`}>
        <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <main>
          <Routes>
            <Route path="/database" element={<DatabaseScreen />} />
            <Route path="/" element={<Body />} exact />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
