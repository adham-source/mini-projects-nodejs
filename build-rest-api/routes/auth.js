const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  // Check if user is already in the database
  const userExist = await User.findOne({email: req.body.email})
  if(userExist) return res.status(400).json({
    message: 'Write another email'
  })
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch(error) {
    res.status(400).json({
      message: error.message
    })
  }
})

router.post('/login', async (req, res) => {
  // Check email exists to find user in db
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).json({
    message: 'Email or Password is wrong'
  })
  // Check password is correct
  const correctPassword = await bcrypt.compare(req.body.password, user.password)
  if(!correctPassword) return res.status(400).json({
    message: 'Email or Password is wrong'
  })
  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN)
  res.header('auth-token', token).json({ 
    token: token, 
    name: user.name, 
    message: 'Logged in'
  })
})

module.exports = router