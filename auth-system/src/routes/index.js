import { Router } from "express"
import { User } from "../models"

const router = Router()

router.get("/", async (req, res) => {
  let users = await User.find({})
  if (!users)
    return res.status(404).json({
      success: false,
      message: "Users not found",
    })

  try {
    return res.render("index", { users })
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Users not found",
    })
  }
})

export default router
