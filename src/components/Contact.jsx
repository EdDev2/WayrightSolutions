import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

// Initialize EmailJS (REPLACE WITH YOUR PUBLIC KEY)
if (!emailjs.publicKey) {
  emailjs.init('swsYA9TCmDgYNI3M2')
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
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
    if (formData.name && formData.email && formData.message) {
      emailjs.send(
        'service_m1mub2e',
        'template_y4ug9ty',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'info@wayrightsolutions.com'
        }
      ).then(
        (response) => {
          setSubmitted(true)
          setFormData({ name: '', email: '', message: '' })
          setError('')
          setTimeout(() => setSubmitted(false), 3000)
        },
        (error) => {
          console.error('Failed to send email:', error)
          setError('Failed to send message. Please try again.')
          setTimeout(() => setError(''), 3000)
        }
      )
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="contact-email">
              <strong>Email:</strong> 
              <a href="mailto:info@wayrightsolutions.com?subject=Wayright Solutions Inquiry">info@wayrightsolutions.com</a>
            </p>
            <p className="contact-description">
              Have questions about our services? Interested in a consultation? 
              Reach out to us directly or use the form below.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
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
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        {submitted && (
          <div className="success-message">
            ✓ Message sent successfully! We'll get back to you soon.
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

export default Contact
