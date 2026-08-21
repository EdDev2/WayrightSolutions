import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

import './WaitingList.css'

const RECAPTCHA_SITE_KEY = '6LdygJEtAAAAADRlkSqX9RG_zSBjGlQXDr7AGDL8'

// ============================================================
// EMAILJS
// ============================================================

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

  // reCAPTCHA container
  const captchaRef = useRef(null)

  // Google widget ID
  const captchaWidgetId = useRef(null)

  // Keeps latest form data available to callback
  const formDataRef = useRef(formData)

  // Keep ref synchronized
  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  // ============================================================
  // RENDER reCAPTCHA AFTER GOOGLE LOADS
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
        captchaWidgetId.current =
          window.grecaptcha.render(
            captchaRef.current,
            {
              sitekey: RECAPTCHA_SITE_KEY,

              size: 'invisible',

              callback: handleCaptchaSuccess,

              'expired-callback':
                handleCaptchaExpired,

              'error-callback':
                handleCaptchaError
            }
          )

        setCaptchaReady(true)

        console.log(
          'Waiting-list reCAPTCHA loaded successfully.'
        )
      } catch (err) {
        console.error(
          'Failed to render waiting-list reCAPTCHA:',
          err
        )

        setError(
          'Security verification could not be loaded. Please refresh the page.'
        )
      }
    }

    // Google already loaded
    if (
      window.recaptchaLoaded &&
      window.grecaptcha
    ) {
      renderCaptcha()
    } else {
      // Wait for Google
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
    console.log(
      'Waiting-list reCAPTCHA verification successful.'
    )

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
    console.log(
      'Waiting-list reCAPTCHA token expired.'
    )

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
      'Waiting-list reCAPTCHA encountered an error.'
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

    if (
      !formData.name ||
      !formData.email
    ) {
      setError(
        'Please complete all fields.'
      )

      return
    }

    if (!captchaReady) {
      setError(
        'Security verification is still loading. Please try again.'
      )

      return
    }

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
      'Starting waiting-list Invisible reCAPTCHA...'
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
      'Sending waiting-list registration through EmailJS...'
    )

    emailjs
      .send(
        'service_m1mub2e',
        'template_ju5ba8e',
        {
          from_name: currentFormData.name,

          from_email: currentFormData.email,

          to_email: 'info@wayrightsolutions.com',

          // EmailJS expects the reCAPTCHA token here
          'g-recaptcha-response': captchaToken
        }
      )
      .then(
        () => {
          console.log(
            'Waiting-list registration sent successfully.'
          )

          setSubmitted(true)

          setSending(false)

          setFormData({
            name: '',
            email: ''
          })

          formDataRef.current = {
            name: '',
            email: ''
          }

          setError('')

          resetCaptcha()

          setTimeout(() => {
            setSubmitted(false)
          }, 3000)
        },
        (err) => {
          console.error(
            'Failed to send waiting-list registration:',
            err
          )

          setSending(false)

          setError(
            'Failed to register. Please try again.'
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
    <section className="waiting-list">

      <div className="container">

        <h2 className="section-title">
          Join Our Waiting List
        </h2>

        <p className="waiting-subtitle">
          Be among the first to learn about
          Wayright Solutions and get early
          access to our platform.
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

          {/* Invisible reCAPTCHA renders here */}
          <div ref={captchaRef}></div>

          <button
            type="submit"
            className="submit-button"
            disabled={sending}
          >
            {sending
              ? 'Verifying...'
              : 'Join Waiting List'}
          </button>

        </form>

        {submitted && (
          <div className="success-message">
            ✓ Thanks for registering!
            We'll be in touch soon.
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
