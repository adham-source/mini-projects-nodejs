const express = require("express")
const bcrypt = require("bcrypt")

const router = express.Router()

const users = []

router.get("/login", (req, res) => {
  res.render("login", { titlePage: "login" })
})

router.post("/login", (req, res) => {
  res.send("From form login")
})

router.get("/register", (req, res) => {
  res.render("register", { titlePage: "register" })
})

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    res.redirect("/login")
  } catch {
    res.redirect("/register")
  }
  console.log(users)
})

module.exports = router
