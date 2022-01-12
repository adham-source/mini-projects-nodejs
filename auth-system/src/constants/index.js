import { config } from 'dotenv'
config()

export const DB = process.env.BATABASE_URI
export const SECRET = process.env.APP_SECRET
export const DOMIN = process.env.APP_DOMIN
export const SENDGRID = process.env.SENDGRID_API
export const PORT = process.env.PORT || process.env.APP_PORT