import { Router } from "express"

const router = Router()

router.all("*", (req, res) => {
  res.status(404).render("templates/404", { title: "Page Not Found" })
})

export default router
