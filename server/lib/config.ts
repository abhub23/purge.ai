import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET as string
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL as string