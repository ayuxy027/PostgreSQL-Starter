const express = require('express')
const cors = require('cors')

const healthRoutes = require('./routes/health')
const counterRoutes = require('./routes/counter')

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  }),
)

app.use(express.json())

app.use('/api', healthRoutes)
app.use('/api', counterRoutes)

module.exports = app



