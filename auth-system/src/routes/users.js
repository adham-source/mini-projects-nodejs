import { User } from "../models"
import { Router } from "express"
import { randomBytes } from "crypto"
import { DOMIN } from "../constants"
import sendEmail from "../controllers/email-sender"
import { RegisterValidations, AuthenticateValidations } from "../validators"
import Validator from "../middlewares/validator-middleware"

const router = Router()

/**
 * @description To create anew user account
 * @api /users/register
 * @access Public
 * @type POST
 */

router.post("/register", RegisterValidations, Validator, async (req, res) => {
  let { username, email } = req.body
  // Check if the username is taken or not
  let user = await User.findOne({ username })
  if (user)
    return res.status(400).json({
      success: false,
      message: "Username is already taken",
    })
  // Check if the user exists with that email
  user = await User.findOne({ email })
  if (user)
    return res.status(400).json({
      success: false,
      message:
        "Email is already registered. Did you forget the password. Try resetting it.",
    })
  user = new User({
    ...req.body,
    verificationCode: randomBytes(20).toString("hex"),
  })
  try {
    const newUser = await user.save()

    // Send the email to the user with a varification link
    let html = `
      <h2>Hi, ${newUser.username}</h2>
      <p> Please click following link to verify ypur account</p>
      <a href="${DOMIN}users/verify-now/${newUser.verificationCode}">Verify Now</a>
    `
    await sendEmail(
      newUser.email,
      "Verify Account",
      "Please veryfiy your account",
      html
    )

    return res.status(201).json({
      success: true,
      message:
        "Hurray! your account is created please verify your email address",
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "An error occurred",
    })
  }
})

/**
 * @description To verify a new user's account via email
 * @api /users/verify-now/:verificationCode
 * @access Public <Only via email>
 * @type GET
 */

router.get("/verify-now/:verificationCode", async (req, res) => {
  try {
    let { verificationCode } = req.params
    let user = await User.findOne({ verificationCode })
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized access . Invalid verification code .",
      })
    user.verified = true
    user.verificationCode = undefined
    await user.save()
    return res.render("templates/verification-success", {
      title: "verify success",
    })
  } catch (err) {
    return res.render("templates/verification-error", { title: "verify error" })
  }
})

/**
 * @description To Login an user and get auth token
 * @api /users/login
 * @access Public
 * @type POST
 */

router.post("/login", AuthenticateValidations, Validator, async (req, res) => {
  let { username, password } = req.body
  let user = await User.findOne({ username })
  if (!user)
    return res.status(401).json({
      success: false,
      message: "Check username or password !", // Correct msg = Check username or password!
    })
  if (!(await user.comparePassword(password)))
    return res.status(401).json({
      success: false,
      message: "Check username or password !",
    })
  let token = await user.generateJWT()
  try {
    return res.json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
      message: "Hurray! You are now logged in .",
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
    })
  }
})

export default router
