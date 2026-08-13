import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">About Wayright Solutions</h2>
          <p className="about-text">
            Wayright Solutions helps organisations turn monitoring and operational data into practical insights,
            reducing risk, improving compliance, strengthening reporting, and giving a clearer view of what's 
            happening across their sites.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">📊</div>
              <h3>Data Driven</h3>
              <p>Transform raw data into actionable intelligence</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🛡️</div>
              <h3>Compliance Focused</h3>
              <p>Ensure regulatory requirements are consistently met</p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔍</div>
              <h3>Risk Insight</h3>
              <p>Uncover hidden risks before they become problems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
