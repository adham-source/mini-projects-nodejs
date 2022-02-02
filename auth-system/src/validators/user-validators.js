import { check } from "express-validator"

const name = check("name", "Name is required .")
  .not()
  .isEmpty()
  .trim()
  .escape()
  .isString()
const username = check("username", "Username is required .")
  .not()
  .isEmpty()
  .trim()
  .escape()
  .isString()
const email = check("email", "Please provide a valid email address")
  .isEmail()
  .trim()
  .escape()
const password = check(
  "password",
  "Password is required of minimum length of 8 ."
)
  .isLength({ min: 8 })
  .trim()
  .escape()

export const RegisterValidations = [name, username, email, password]
export const AuthenticateValidations = [username, password]
