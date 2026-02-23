const express = require('express')
const router = express.Router()

router.get('/privacy', (req, res) => {
  res.render('privacy', {
    pageTitle: 'Privacy Policy | HubSpiral',
    metaDescription: 'HubSpiral privacy policy.',
  })
})

router.get('/terms', (req, res) => {
  res.render('terms', {
    pageTitle: 'Terms of Service | HubSpiral',
    metaDescription: 'HubSpiral terms of service.',
  })
})

router.get('/returns', (req, res) => {
  res.render('returns', {
    pageTitle: 'Return & Refund Policy | HubSpiral',
    metaDescription: 'HubSpiral return and refund policy.',
  })
})

module.exports = router
