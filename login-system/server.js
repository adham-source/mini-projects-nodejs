if (process.env.NODE_ENV !== "production") require("dotenv").config()
const express = require("express")
const passport = require("passport")
const session = require("express-session")
const flash = require("express-flash")
const app = express()

const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")

app.set("view engine", "pug")
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter)
app.use("/", authRouter)

app.listen(process.env.PORT || 3000)
