const express = require('express')
const router = express.Router()

// GET /checkout/success
router.get('/success', (req, res) => {
  res.render('checkout-success', {
    pageTitle: 'Payment Successful | HubSpiral',
    metaDescription: 'Your payment was received successfully. We will follow up with next steps shortly.',
  })
})

// GET /checkout/cancel
router.get('/cancel', (req, res) => {
  res.render('checkout-cancel', {
    pageTitle: 'Payment Canceled | HubSpiral',
    metaDescription: 'Your payment was canceled. You can return to pricing or contact us for help.',
  })
})

module.exports = router
