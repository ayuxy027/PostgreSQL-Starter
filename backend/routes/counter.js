const express = require('express')
const { getCounterValue, setCounterValue } = require('../db/sqlite')

const router = express.Router()

router.get('/counter', (_req, res) => {
  const value = getCounterValue()
  res.json({ value })
})

router.post('/counter/increment', (_req, res) => {
  const current = getCounterValue()
  const next = current + 1
  const value = setCounterValue(next)
  res.json({ value })
})

router.post('/counter/decrement', (_req, res) => {
  const current = getCounterValue()
  const next = current - 1
  const value = setCounterValue(next)
  res.json({ value })
})

router.post('/counter/reset', (_req, res) => {
  const value = setCounterValue(0)
  res.json({ value })
})

module.exports = router



