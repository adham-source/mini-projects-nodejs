import { Schema, model } from "mongoose"
import { compare, hash } from "bcryptjs"
import { SECRET } from '../constants'
import { randomBytes } from 'crypto'
import { sign } from "jsonwebtoken"
import { pick } from "loadash"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        // required: false
    },
    verificationCode: {
        type: String,
        // required: false
    },
    resetPasswordToken: {
        type: String,
        // required: false
    },
    resetPasswordExpiresIn: {
        type: Date,
        // required: false
    }
}, {timestamps: true}) 

UserSchema.pre('save', async function (next) {
    let user = this
    if(!user.isModified("password")) return next()
    user.password = await hash(user.password, 10)
    next()
})

UserSchema.methods.comparePassword = async function(password) {
    return await compare(password, this.password)
}

UserSchema.methods.generateJWT = async function () {
    let payload = {
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email
    }
    return await sign(payload, SECRET, { expiresIn: "1 day" })
}

UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordExpiresIn = Date.now() + 36000000
    this.resetPasswordToken = randomBytes(20).toString('hex')
}

UserSchema.methods.getUserInfo = function () {
    return pick(this, ["_id", "name", "username", "email"])
}

const User = model("users", UserSchema)
export default User
