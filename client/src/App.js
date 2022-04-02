import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { HomeScreen } from './screens/HomeScreen'
import { DatabaseScreen } from './screens/DatabaseScreen'

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <BrowserRouter>
      <div id="app" className={`App ${darkTheme ? 'dark' : 'light'}`}>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <main>
          <Routes>
            <Route path="/database" element={<DatabaseScreen />} />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
