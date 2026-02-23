const express = require('express')
const router = express.Router()
const siteConfig = require('../config/siteConfig')
const { createCheckoutSession } = require('../services/stripeService')

// POST /checkout
router.post('/', async (req, res, next) => {
  try {
    const { packageId } = req.body

    if (process.env.NODE_ENV !== 'production') {
      console.log('[CHECKOUT] Incoming body:', req.body)
      console.log('[CHECKOUT] packageId:', packageId)
    }

    const chosen = siteConfig.pricing.find((p) => p.id === packageId)

    if (!chosen) {
      return res.status(400).type('text/plain').send('Invalid package.')
    }

    const session = await createCheckoutSession({
      name: chosen.name,
      amountDollars: chosen.price,
    })

    return res.redirect(303, session.url)
  } catch (err) {
    next(err)
  }
})

module.exports = router
