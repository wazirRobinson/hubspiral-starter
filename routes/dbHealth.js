const express = require('express')
const router = express.Router()

const db = require('../db') // assumes your db/index.js exports a Pool or a query helper

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT NOW() as now')
    res.type('application/json').status(200).send({
      ok: true,
      now: result.rows[0].now,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
