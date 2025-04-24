import z from 'zod';

const userSchema = z.object({
    username: z.string().min(3).max(27),
    password: z.string().min(8).max(20),
    email:z.string().email()
})

export const validateUser = function (object) {
    return userSchema.safeParse(object)
}
export const validatePartialUser = function (object) {
    return userSchema.partial().safeParse(object)
}