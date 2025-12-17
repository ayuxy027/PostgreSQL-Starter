import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
  createUser,
  findUserByUsername,
  getAllUsers,
  getUserCount,
  testConnection
} from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    next()
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

app.get('/api/health', async (req, res) => {
  const dbHealth = await testConnection()
  res.json({
    status: 'healthy',
    systems: {
      api: { status: 'healthy' },
      database: {
        status: dbHealth.status,
        driver: dbHealth.driver,
        database: dbHealth.database
      }
    },
    timestamp: new Date().toISOString()
  })
})

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Username and password must be strings' })
    }

    if (username.trim().length === 0 || password.trim().length === 0) {
      return res.status(400).json({ error: 'Username and password cannot be empty' })
    }

    if (username.length > 50) {
      return res.status(400).json({ error: 'Username must be 50 characters or less' })
    }

    const user = await createUser(username.trim(), password)
    res.status(201).json({ id: user.id, username: user.username, createdAt: user.createdAt })
  } catch (error) {
    if (error.message === 'Username already exists') {
      return res.status(409).json({ error: error.message })
    }
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Username and password must be strings' })
    }

    const user = await findUserByUsername(username.trim())

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    res.json({ id: user.id, username: user.username, createdAt: user.createdAt })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

app.get('/api/users/count', async (req, res) => {
  try {
    const count = await getUserCount()
    res.json({ count })
  } catch (error) {
    console.error('Error fetching user count:', error)
    res.status(500).json({ error: 'Failed to fetch user count' })
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})

