import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const emailSchema = z.object({
	email: z.string().email(),
})

export const registerSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	avatar: z.string().optional(),
})
