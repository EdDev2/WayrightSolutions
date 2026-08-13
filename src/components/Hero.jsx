import React from 'react'
import './Hero.css'

function Hero() {
     const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <section className="hero" style={{backgroundImage: 'url(/backgroundslogan.jpeg)'}}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-dark">Clearer data.</span>
            <span className="title-blue">Better outcomes.</span>
          </h1>
          <p className="hero-subtitle">
            Collecting data is only the beginning. We help organisations understand it, 
            spot what matters, and act on it.
          </p>
          <button onClick={() => scrollToSection('contact')} className="cta-button">Get Started</button>
        </div>
      </div>
    </section>
  )
}

export default Hero
