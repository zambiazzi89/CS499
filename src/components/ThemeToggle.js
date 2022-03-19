import React from 'react'
import './ThemeToggle.css'

export const ThemeToggle = ({ darkTheme }) => {
  // Button to toggle the website's theme
  return (
    <div className="theme-toggle">
      <div
        className={`toggle-notch ${darkTheme ? 'dark-theme' : 'light-theme'}`}
      />
    </div>
  )
}
