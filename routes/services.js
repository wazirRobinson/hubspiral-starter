const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('services', {
    pageTitle: 'Services | HubSpiral',
    metaDescription:
      'HubSpiral builds conversion-focused business websites, web applications, and ecommerce solutions for contractors and real estate operators.',
  })
})

module.exports = router
