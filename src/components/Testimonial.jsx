import React from 'react'
import './Testimonial.css'

function Testimonial() {
  return (
    <section className="testimonial">
      <div className="container">
        <div className="testimonial-content">
          <svg className="quote-icon" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M13 25C13 17.268 18.268 12 26 12H27V22C27 23.104 26.104 24 25 24H15V35C15 38.314 12.314 41 9 41C5.686 41 3 38.314 3 35V27C3 25.896 3.896 25 5 25H13Z" fill="var(--secondary-color)"/>
            <path d="M43 25C43 17.268 48.268 12 56 12H57V22C57 23.104 56.104 24 55 24H45V35C45 38.314 42.314 41 39 41C35.686 41 33 38.314 33 35V27C33 25.896 33.896 25 35 25H43Z" fill="var(--secondary-color)"/>
          </svg>
          <h2 className="testimonial-title">
            The right data doesn't just confirm what you know. 
            It surfaces the risks you'd have missed and the opportunities 
            you didn't know were there.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
