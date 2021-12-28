const { users } = require('../data')

// Middleware simple function
function setUser (req, res, next) {
    const userId = req.body.userId
    if(userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

module.exports = {
    setUser
}