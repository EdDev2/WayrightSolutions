import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-content">

          <div className="footer-section">

            <h3 className="footer-company-name">
              Wayright Solutions
            </h3>

            <p className="footer-location">
              Based in Peterborough, Cambridgeshire
            </p>

          </div>

          <div className="footer-section">

            <h4>Contact</h4>

            <p>
              <a href="mailto:info@wayrightsolutions.com?subject=Wayright Solutions Inquiry">
                Email
              </a>
            </p>

            <p>
              <a href="/privacy.html">
                Privacy Notice
              </a>
            </p>

          </div>

          <div className="footer-section">

            <h4>Follow Us</h4>

            <p>
              <a
                href="https://www.linkedin.com/company/wayright-solutions/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            &copy; {new Date().getFullYear()} Wayright Solutions Ltd. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer
