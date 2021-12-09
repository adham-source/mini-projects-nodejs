const mongoose = require('mongoose')
const Book = require('./Book')

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre("remove", function(next) {
    Book.find({author: this.id}, (error, books) => {
        if(error) next(error)
        if(books.length > 0) next (new Error(`This author has book still`))
        next()
    })
})

module.exports = mongoose.model('Author', authorSchema)