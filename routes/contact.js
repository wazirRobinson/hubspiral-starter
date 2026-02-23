const express = require('express')
const router = express.Router()
const { sendContactEmail } = require('../services/emailService')

router.get('/', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact | HubSpiral',
    metaDescription:
      'Request a quote for a business website, web application, or ecommerce project. Get a clear timeline and next steps from HubSpiral.',
    formData: {},
  })
})

router.post('/', async (req, res, next) => {
  const {
    fullName = '',
    email = '',
    phone = '',
    company = '',
    service = '',
    budget = '',
    timeline = '',
    source = '',
    message = '',
  } = req.body

  const errors = []

  if (!fullName.trim()) errors.push('Full name is required.')
  if (!email.trim()) errors.push('Email is required.')
  if (!service.trim()) errors.push('Please select what you need.')
  if (!source.trim()) errors.push('Please tell us how you heard about us.')
  if (!message.trim()) errors.push('Project details are required.')

  if (errors.length > 0) {
    return res.status(400).render('contact', {
      pageTitle: 'Contact | HubSpiral',
      metaDescription:
        'Request a quote for a business website, web application, or ecommerce project. Get a clear timeline and next steps from HubSpiral.',
      errors,
      formData: {
        fullName,
        email,
        phone,
        company,
        service,
        budget,
        timeline,
        source,
        message,
      },
    })
  }

  try {
    await sendContactEmail({
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      source,
      message,
    })

    return res.render('contact-thanks', {
      pageTitle: 'Thanks | HubSpiral',
      metaDescription: 'Thanks for reaching out to HubSpiral. We’ll reply soon.',
    })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[CONTACT] Email send failed:', err)
    }

    // Prefer config-provided support email if available via global locals
    const supportEmail =
      (res.locals && res.locals.contact && res.locals.contact.email) ||
      'hello@hubspiral.com'

    return res.status(500).render('contact', {
      pageTitle: 'Contact | HubSpiral',
      metaDescription:
        'Request a quote for a business website, web application, or ecommerce project. Get a clear timeline and next steps from HubSpiral.',
      errors: [
        `Something went wrong sending your message. Please try again or email ${supportEmail}.`,
      ],
      formData: {
        fullName,
        email,
        phone,
        company,
        service,
        budget,
        timeline,
        source,
        message,
      },
    })
  }
})

module.exports = router
