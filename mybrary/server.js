if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const booksRouter = require('./routes/books')


app.set('view engine', 'pug') // app.set to used pug engine (ejs used app.use)
app.set('views', __dirname + '/views')
app.set('layout', '/layouts/layout')
// app.set(express.static('public'))

app.use(express.static(path.join(__dirname, 'public/')))
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({limit: "10mb", extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 5000)