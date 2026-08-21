import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

import './WaitingList.css'

const RECAPTCHA_SITE_KEY = '6LdygJEtAAAAADRlkSqX9RG_zSBjGlQXDr7AGDL8'

// Initialize EmailJS
if (!emailjs.publicKey) {
  emailjs.init('swsYA9TCmDgYNI3M2')
}

function WaitingList() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [captchaReady, setCaptchaReady] = useState(false)
  const [sending, setSending] = useState(false)

  const captchaRef = useRef(null)
  const captchaWidgetId = useRef(null)

  // ============================================================
  // LOAD / RENDER INVISIBLE RECAPTCHA
  // ============================================================

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

  // ============================================================
  // RECAPTCHA SUCCESS
  // ============================================================

  const handleCaptchaSuccess = (token) => {
    sendEmail(token)
  }

  // ============================================================
  // RECAPTCHA EXPIRED
  // ============================================================

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

  // ============================================================
  // RECAPTCHA ERROR
  // ============================================================

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

  // ============================================================
  // FORM FIELD CHANGES
  // ============================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setError('')
  }

  // ============================================================
  // FORM SUBMISSION
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
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

    // Execute Invisible reCAPTCHA.
    //
    // Once Google completes the check, handleCaptchaSuccess()
    // receives the token and sends the EmailJS request.
    window.grecaptcha.execute(captchaWidgetId.current)
  }

  // ============================================================
  // SEND EMAIL THROUGH EMAILJS
  // ============================================================

  const sendEmail = (captchaToken) => {
    if (!captchaToken) {
      setSending(false)
      setError('Security verification failed. Please try again.')
      return
    }

    emailjs
      .send(
        'service_m1mub2e',
        'template_ju5ba8e',
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: 'info@wayrightsolutions.com',

          // EmailJS uses this token to verify the reCAPTCHA.
          'g-recaptcha-response': captchaToken
        }
      )
      .then(
        () => {
          setSubmitted(true)
          setSending(false)

          setFormData({
            name: '',
            email: ''
          })

          setError('')

          // Reset reCAPTCHA so it can be used again.
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
          setError('Failed to register. Please try again.')

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
    <section className="waiting-list">

      <div className="container">

        <h2 className="section-title">
          Join Our Waiting List
        </h2>

        <p className="waiting-subtitle">
          Be among the first to learn about Wayright Solutions and get early access to our platform.
        </p>

        <form
          className="waiting-form"
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

          {/* Invisible reCAPTCHA widget */}
          <div ref={captchaRef}></div>

          <button
            type="submit"
            className="submit-button"
            disabled={sending}
          >
            {sending ? 'Verifying...' : 'Join Waiting List'}
          </button>

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
