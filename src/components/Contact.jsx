import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

import './Contact.css'


const RECAPTCHA_SITE_KEY = '6LdygJEtAAAAADRlkSqX9RG_zSBjGlQXDr7AGDL8'

// ============================================================
// EMAILJS
// ============================================================

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

  // Reference to the HTML element where reCAPTCHA will render
  const captchaRef = useRef(null)

  // Stores the Google reCAPTCHA widget ID
  const captchaWidgetId = useRef(null)

  // Keeps the latest form data available to the CAPTCHA callback
  const formDataRef = useRef(formData)

  // Keep ref synchronized with React state
  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  // ============================================================
  // RENDER reCAPTCHA AFTER GOOGLE HAS LOADED
  // ============================================================

  useEffect(() => {
    let mounted = true

    const renderCaptcha = () => {
      if (!mounted) return

      if (
        !window.grecaptcha ||
        !captchaRef.current ||
        captchaWidgetId.current !== null
      ) {
        return
      }

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

        console.log(
          'Invisible reCAPTCHA loaded successfully.'
        )
      } catch (err) {
        console.error(
          'Failed to render reCAPTCHA:',
          err
        )

        setError(
          'Security verification could not be loaded. Please refresh the page.'
        )
      }
    }

    // Google may already have loaded before React mounted
    if (
      window.recaptchaLoaded &&
      window.grecaptcha
    ) {
      renderCaptcha()
    } else {
      // Otherwise wait for Google's load event
      window.addEventListener(
        'recaptcha-loaded',
        renderCaptcha
      )
    }

    return () => {
      mounted = false

      window.removeEventListener(
        'recaptcha-loaded',
        renderCaptcha
      )
    }
  }, [])

  // ============================================================
  // CAPTCHA SUCCESS
  // ============================================================

  const handleCaptchaSuccess = (token) => {
    console.log('reCAPTCHA verification successful.')

    if (!token) {
      setSending(false)

      setError(
        'Security verification failed. Please try again.'
      )

      return
    }

    sendEmail(token)
  }

  // ============================================================
  // CAPTCHA EXPIRED
  // ============================================================

  const handleCaptchaExpired = () => {
    console.log('reCAPTCHA token expired.')

    setSending(false)

    setError(
      'Security verification expired. Please try again.'
    )

    resetCaptcha()
  }

  // ============================================================
  // CAPTCHA ERROR
  // ============================================================

  const handleCaptchaError = () => {
    console.error(
      'reCAPTCHA encountered an error.'
    )

    setSending(false)

    setError(
      'Security verification failed. Please check your connection and try again.'
    )

    resetCaptcha()
  }

  // ============================================================
  // RESET CAPTCHA
  // ============================================================

  const resetCaptcha = () => {
    if (
      window.grecaptcha &&
      captchaWidgetId.current !== null
    ) {
      window.grecaptcha.reset(
        captchaWidgetId.current
      )
    }
  }

  // ============================================================
  // FORM FIELD CHANGES
  // ============================================================

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    }

    setFormData(updatedData)

    formDataRef.current = updatedData

    setError('')
  }

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      setError(
        'Please complete all fields.'
      )

      return
    }

    // Make sure CAPTCHA has loaded
    if (!captchaReady) {
      setError(
        'Security verification is still loading. Please try again.'
      )

      return
    }

    // Make sure widget exists
    if (
      !window.grecaptcha ||
      captchaWidgetId.current === null
    ) {
      setError(
        'Security verification is unavailable. Please refresh the page and try again.'
      )

      return
    }

    setSending(true)

    setError('')

    console.log(
      'Starting Invisible reCAPTCHA...'
    )

    // Execute Invisible v2
    window.grecaptcha.execute(
      captchaWidgetId.current
    )
  }

  // ============================================================
  // SEND EMAIL THROUGH EMAILJS
  // ============================================================

  const sendEmail = (captchaToken) => {
    const currentFormData =
      formDataRef.current

    console.log(
      'Sending contact form through EmailJS...'
    )

    emailjs
      .send(
        'service_m1mub2e',
        'template_y4ug9ty',
        {
          from_name: currentFormData.name,

          from_email: currentFormData.email,

          message: currentFormData.message,

          to_email: 'info@wayrightsolutions.com',

          // EmailJS expects the reCAPTCHA token here
          'g-recaptcha-response': captchaToken
        }
      )
      .then(
        () => {
          console.log(
            'Contact email sent successfully.'
          )

          setSubmitted(true)

          setSending(false)

          setFormData({
            name: '',
            email: '',
            message: ''
          })

          formDataRef.current = {
            name: '',
            email: '',
            message: ''
          }

          setError('')

          resetCaptcha()

          setTimeout(() => {
            setSubmitted(false)
          }, 3000)
        },
        (err) => {
          console.error(
            'Failed to send contact email:',
            err
          )

          setSending(false)

          setError(
            'Failed to send message. Please try again.'
          )

          resetCaptcha()

          setTimeout(() => {
            setError('')
          }, 5000)
        }
      )
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <section
      id="contact"
      className="contact"
    >
      <div className="container">

        <h2 className="section-title">
          Get In Touch
        </h2>

        <div className="contact-content">

          <div className="contact-info">

            <h3>
              <a
                href="mailto:info@wayrightsolutions.com?subject=Wayright Solutions Inquiry"
              >
                Contact Us
              </a>
            </h3>

            <p className="contact-description">
              Have questions about our services?
              Interested in a consultation?
              Reach out to us directly or use the
              form below.
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

            {/* Invisible reCAPTCHA renders here */}
            <div ref={captchaRef}></div>

            <button
              type="submit"
              className="submit-button"
              disabled={sending}
            >
              {sending
                ? 'Verifying...'
                : 'Send Message'}
            </button>

          </form>

        </div>

        {submitted && (
          <div className="success-message">
            ✓ Message sent successfully!
            We'll get back to you soon.
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
