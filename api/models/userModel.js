
export class UserModel {
    static async register({ input, hashedPassword }) {
        const newUser = {
            username: input.username,
            email: input.email,
            password: hashedPassword,
        }
        // Save in DB
    }
}