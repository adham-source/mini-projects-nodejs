const express = require('express')
const app = express()
require('./db/connection')

// Import router
const authRouter = require('./routes/auth')
const subscribersRouter = require('./routes/subscribers')

// Using json in body
app.use(express.json())

// Router Midddleware
app.use('/api/user', authRouter)
app.use('/api/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server started'))