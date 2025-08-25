import {z} from 'zod'

export const cookieSchema = z.object({
    'better-auth.session_token' : z.string().min(20, 'Invalid Cookie')
})