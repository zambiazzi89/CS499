import React from 'react'
import './ThemeToggle.css'

export const ThemeToggle = ({ darkTheme }) => {
  return (
    <div className="theme-toggle">
      <div
        className={`toggle-notch ${darkTheme ? 'dark-theme' : 'light-theme'}`}
      />
    </div>
  )
}
