import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

import './Contact.css'

const RECAPTCHA_SITE_KEY = '6LdygJEtAAAAADRlkSqX9RG_zSBjGlQXDr7AGDL8'

// Initialize EmailJS
if (!emailjs.publicKey) {
  emailjs.init('swsYA9TCmDgYNI3M2')
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [captchaReady, setCaptchaReady] = useState(false)
  const [sending, setSending] = useState(false)

  const captchaRef = useRef(null)
  const captchaWidgetId = useRef(null)

  useEffect(() => {
    let interval

    const renderCaptcha = () => {
      if (
        window.grecaptcha &&
        captchaRef.current &&
        captchaWidgetId.current === null
      ) {
        try {
          captchaWidgetId.current = window.grecaptcha.render(
            captchaRef.current,
            {
              sitekey: RECAPTCHA_SITE_KEY,
              size: 'invisible',
              callback: handleCaptchaSuccess,
              'expired-callback': handleCaptchaExpired,
              'error-callback': handleCaptchaError
            }
          )

          setCaptchaReady(true)

          if (interval) {
            clearInterval(interval)
          }
        } catch (error) {
          console.error('Failed to render reCAPTCHA:', error)
        }
      }
    }

    renderCaptcha()

    interval = setInterval(renderCaptcha, 100)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  const handleCaptchaSuccess = (token) => {
    sendEmail(token)
  }

  const handleCaptchaExpired = () => {
    setSending(false)
    setError('Security verification expired. Please try again.')

    if (
      window.grecaptcha &&
      captchaWidgetId.current !== null
    ) {
      window.grecaptcha.reset(captchaWidgetId.current)
    }
  }

  const handleCaptchaError = () => {
    setSending(false)
    setError(
      'Security verification failed. Please check your connection and try again.'
    )

    if (
      window.grecaptcha &&
      captchaWidgetId.current !== null
    ) {
      window.grecaptcha.reset(captchaWidgetId.current)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please complete all fields.')
      return
    }

    if (!captchaReady) {
      setError('Security verification is still loading. Please try again.')
      return
    }

    if (
      !window.grecaptcha ||
      captchaWidgetId.current === null
    ) {
      setError('Security verification is unavailable. Please try again.')
      return
    }

    setSending(true)
    setError('')

    window.grecaptcha.execute(captchaWidgetId.current)
  }

  const sendEmail = (captchaToken) => {
    if (!captchaToken) {
      setSending(false)
      setError('Security verification failed. Please try again.')
      return
    }

    emailjs
      .send(
        'service_m1mub2e',
        'template_y4ug9ty',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'info@wayrightsolutions.com',
          'g-recaptcha-response': captchaToken
        }
      )
      .then(
        () => {
          setSubmitted(true)
          setSending(false)

          setFormData({
            name: '',
            email: '',
            message: ''
          })

          setError('')

          if (
            window.grecaptcha &&
            captchaWidgetId.current !== null
          ) {
            window.grecaptcha.reset(captchaWidgetId.current)
          }

          setTimeout(() => {
            setSubmitted(false)
          }, 3000)
        },
        (error) => {
          console.error('Failed to send email:', error)

          setSending(false)
          setError('Failed to send message. Please try again.')

          if (
            window.grecaptcha &&
            captchaWidgetId.current !== null
          ) {
            window.grecaptcha.reset(captchaWidgetId.current)
          }

          setTimeout(() => {
            setError('')
          }, 3000)
        }
      )
  }

  return (
    <section id="contact" className="contact">
      <div className="container">

        <h2 className="section-title">
          Get In Touch
        </h2>

        <div className="contact-content">

          <div className="contact-info">

            <h3>
              <a href="mailto:info@wayrightsolutions.com?subject=Wayright Solutions Inquiry">
                Contact Us
              </a>
            </h3>

            <p className="contact-description">
              Have questions about our services? Interested in a consultation?
              Reach out to us directly or use the form below.
            </p>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

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

            <div ref={captchaRef}></div>

            <button
              type="submit"
              className="submit-button"
              disabled={sending}
            >
              {sending ? 'Verifying...' : 'Send Message'}
            </button>

            <p className="privacy-form-notice">
              We'll use your details to respond to your enquiry.{' '}
              <a
                href="/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                See our Privacy Notice
              </a>{' '}
              for more information.
            </p>

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
