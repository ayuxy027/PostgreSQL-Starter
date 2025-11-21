const express = require('express')
const { db } = require('../db/sqlite')

const router = express.Router()

router.get('/health', (_req, res) => {
  let dbStatus = 'down'

  try {
    db.prepare('SELECT 1').get()
    dbStatus = 'up'
  } catch (error) {
    console.error('Health check DB error:', error)
    dbStatus = 'down'
  }

  const systems = {
    api: { status: 'up' },
    database: {
      status: dbStatus,
      driver: 'better-sqlite3',
      file: 'backend/data.sqlite',
    },
  }

  res.json({
    status: dbStatus === 'up' ? 'ok' : 'degraded',
    systems,
    timestamp: new Date().toISOString(),
  })
})

module.exports = router



