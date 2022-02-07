import { User } from "../models"
import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { SECRET as secretOrKey } from "../constants"

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    let user = await User.findById(id)
    if (!user) throw new Error("User not found !")
    try {
      return done(null, user.getUserInfo())
    } catch (err) {
      done(null, false)
    }
  })
)
