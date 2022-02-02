const express = require("express")

const app = express()

const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")

app.set("view engine", "pug")
app.use(express.urlencoded({ extended: false }))

app.use("/", indexRouter)
app.use("/", authRouter)

app.listen(process.env.PORT || 3000)
