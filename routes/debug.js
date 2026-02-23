const express = require('express')
const router = express.Router()

router.get('/debug-500', (req, res) => {
  throw new Error('Debug 500 triggered')
})

module.exports = router
