const express = require('express')
const router = express.Router()

// Home page content
router.get('/', (req, res) => {
    res.send('Home page')
})

module.exports = router