const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pricing', {
    pageTitle: 'Pricing | HubSpiral',
    metaDescription:
      'Browse HubSpiral pricing packages for conversion-focused website systems, plus optional payments and ecommerce add-ons.',
  })
})

module.exports = router
