const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")

const router = express.Router()

const initializePassport = require("../passport-config")
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
)

const users = []

router.get("/login", (req, res) => {
  res.render("login", { titlePage: "login" })
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

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
})

module.exports = router
