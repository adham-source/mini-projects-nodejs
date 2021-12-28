const express = require('express')
const router = express.Router()

const { ROLE, users } = require('../data')
const { authUser, authRole } = require('../controller/basicAuth')

// Get all users
router.get('/', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send(users)
})



module.exports = router