// import cors from "cors"
import consola from "consola"
import express from "express"
import mongoose from "mongoose"
import { json } from "body-parser"

// Import application constants
import { DB, PORT } from "./constants"

// Router exports
import userRoutes from './routes/users'

// Initialize express application
const app = express()

// Apply application middlewares
// app.use(cors())
app.use(json())

// Inject sub router 
app.use('/users', userRoutes)

const main = async () => {
    try {
        // Connect with the database
        await mongoose.connect(DB, {
            useNewUrlParser: true
        })
        consola.success("Database connected ..")
        app.listen(PORT, () => consola.success(`Server started on port ${PORT}`))
    } catch(err) {
        consola.error(`Unable to start the server \n${err.message}`)
    }
}
main()