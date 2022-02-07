const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", { titlePage: "Home", name: req.user.name })
})

module.exports = router
