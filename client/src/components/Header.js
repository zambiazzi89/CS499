import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { Logo } from '../Logo'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { ThemeToggle } from './ThemeToggle'

export const Header = ({ darkTheme, setDarkTheme }) => {
  // Header contains a logo, as well as LinkedIn and GitHub links
  // It also allow users to toggle the theme between light and dark
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className="header-background">
      <header className="App-header">
        <Link to="/" id="logo" onClick={() => setToggleMenu(!toggleMenu)}>
          <Logo />
        </Link>
        <nav>
          <MdMenu
            onClick={() => setToggleMenu(!toggleMenu)}
            className="header-menu-button nav-button icons"
          />
          <ul className={`${toggleMenu ? 'dropdown-open' : 'dropdown-closed'}`}>
            <li>
              <Link
                to="/database"
                className="database-nav-button"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                DB
              </Link>
            </li>
            <li className="nav-button" onClick={() => setToggleMenu(false)}>
              <a
                href="https://github.com/zambiazzi89"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="icons" />
              </a>
            </li>
            <li className="nav-button" onClick={() => setToggleMenu(false)}>
              <a
                href="https://linkedin.com/in/zambiazzi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="icons" />
              </a>
            </li>
          </ul>
          <li
            className="nav-button"
            title="Theme"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            <ThemeToggle darkTheme={darkTheme} />
          </li>
        </nav>
      </header>
    </div>
  )
}
