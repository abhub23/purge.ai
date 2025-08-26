import {z} from 'zod'

export const cookieSchema = z.string().min(20, 'Invalid cookie')