import cors from "cors"
import consola from "consola"
import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import { json } from "body-parser"

// Import application constants
import { DB, PORT } from "./constants"

// Router imports
import indexRouter from "./routes/index"
import userRoutes from "./routes/users"
import notFoundPage from "./routes/page-notfound-404"

// Imports passport middleware
require("./middlewares/passport-middleware")

// Initialize express application
const app = express()

app.set("view engine", "pug")
app.set("views", __dirname + "/views") // Check practice
app.use(express.urlencoded({ extended: false }))

// Apply application middlewares
app.use(cors())
app.use(passport.initialize())
app.use(json())

// Inject sub router
app.use("/", indexRouter)
app.use("/users", userRoutes)
app.use("*", notFoundPage) // Important under router

const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    })
    consola.success("Database connected ..")
    app.listen(PORT, () => consola.success(`Server started on port ${PORT}`))
  } catch (err) {
    consola.error(`Unable to start the server \n${err.message}`)
  }
}
main()
