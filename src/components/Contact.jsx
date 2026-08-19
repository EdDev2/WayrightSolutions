import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

emailjs.init('swsYA9TCmDgYNI3M2')

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitted(false)
    setError('')

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSending(true)

    try {
      await emailjs.send(
        'service_m1mub2e',
        'template_y4ug9ty',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'info@wayrightsolutions.com'
        }
      )

      setSubmitted(true)

      setFormData({
        name: '',
        email: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to send email:', err)
      setError('Failed to send message. Please try again.')

      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-info">
        <h3>
          <a href="/contact">Contact Us</a>
        </h3>

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
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>

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
    </section>
  )
}

export default Contact
