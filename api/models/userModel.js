import { connection } from "../config.js";

export class UserModel {

    static async getUsers() {
        const [userRows] = await connection.execute('SELECT UserID_u, Username_u, Email_u,Role.u role FROM Users')
        return userRows
    }

    static async login({ input }) {
        const { username } = input
        const [userRows] = await connection.execute('SELECT UserID_u, UserName_u, UserPassword_u, Role.u FROM Users WHERE Username = ?', [username])
        return userRows
    }

    static async register({ input }) {
        const { username, email, hashedPassword } = input
        await connection.execute('insert into Users (Username_u, Email_u,UserPassword_u) values (?,?,?);', [username, email, hashedPassword])
        return true
    }
    static async deleteUser({ id }) {
        const [userRows] = await connection.execute('DELETE FROM Users WHERE UserID_u = ?', [id])
        return userRows
    }
    static async editUser({ id, input }) {
        const { username, email, role } = input
        await connection.execute('UPDATE Users SET Username_u = ?, Email_u = ?, Role_u = ? WHERE UserID = ?', [username, email, role, id])
        return true
    }
}