import React from 'react'
import './Header.css'

function Header() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <img src="/wayright-logo-200h.jpg" alt="Wayright Solutions" className="logo" />
          </div>
          <nav className="nav">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            <a href="https://www.linkedin.com/company/wayright-solutions/" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
