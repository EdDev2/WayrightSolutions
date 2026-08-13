import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './WaitingList.css'

// Initialize EmailJS (REPLACE WITH YOUR PUBLIC KEY)
if (!emailjs.publicKey) {
  emailjs.init('swsYA9TCmDgYNI3M2')
}

function WaitingList() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      emailjs.send(
        'service_m1mub2e',
        'template_ju5ba8e',
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: 'info@wayrightsolutions.com'
        }
      ).then(
        (response) => {
          setSubmitted(true)
          setFormData({ name: '', email: '' })
          setError('')
          setTimeout(() => setSubmitted(false), 3000)
        },
        (error) => {
          console.error('Failed to send email:', error)
          setError('Failed to register. Please try again.')
          setTimeout(() => setError(''), 3000)
        }
      )
    }
  }

  return (
    <section className="waiting-list">
      <div className="container">
        <h2 className="section-title">Join Our Waiting List</h2>
        <p className="waiting-subtitle">
          Be among the first to learn about Wayright Solutions and get early access to our platform.
        </p>
        <form className="waiting-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Join Waiting List</button>
        </form>
        {submitted && (
          <div className="success-message">
            ✓ Thanks for registering! We'll be in touch soon.
          </div>
        )}
        {error && (
          <div className="error-message">
            ✗ {error}
          </div>
        )}
      </div>
    </section>
  )
}

export default WaitingList
