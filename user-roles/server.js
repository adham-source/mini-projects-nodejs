const express = require('express')
const { setUser } = require('./controller/helper')
const { authUser, authRole } = require('./controller/basicAuth')


const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')
const { ROLE } = require('./data')

const app = express()
app.use(express.json())

app.use(setUser)

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/projects', projectRouter)



app.get('/dashboard', (req, res) => {
    res.send('Dashboard page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin page')
})

app.listen(process.env.PORT || 3000)