import { connection } from "../config.js";

export class UserModel {

    static async getUsers() {
        const [userRows] = await connection.execute('SELECT UserID, Username, Email, role FROM Users')
        return userRows
    }

    static async login({ input }) {
        const { username } = input
        const [userRows] = await connection.execute('SELECT UserID, UserName, UserPassword, role FROM Users WHERE Username = ?', [username])
        return userRows
    }

    static async register({ input }) {
        const { username, email, hashedPassword } = input
        await connection.execute('insert into Users (Username, Email,UserPassword) values (?,?,?);', [username, email, hashedPassword])
        return true
    }
    static async deleteUser({ id }) {
        const [userRows] = await connection.execute('DELETE FROM Users WHERE UserID = ?', [id])
        return userRows
    }
    static async editUser({ id, input }) {
        const { username, email, role } = input
        await connection.execute('UPDATE Users SET Username = ?, Email = ?, role = ? WHERE UserID = ?', [username, email, role, id])
        return true
    }
}