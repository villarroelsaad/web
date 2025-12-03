import { connection } from "../config.js";

export class PublishModel {
	static async create({ input }) {
		const { publish, userId } = input;
		// Insert a new publish row (allow multiple publishes per user)
		const sql = `INSERT INTO publish (publish_p, UserID_u_p, created_at) VALUES (?, ?, NOW())`;
		const [result] = await connection.execute(sql, [publish, userId]);
		const id = result.insertId;
		if (!id) return null;
		// Return the full publish row including user info
		const sqlGet = `SELECT p.id_p, p.publish_p, p.UserID_u_p, p.created_at, u.Username_u, u.Email_u FROM publish p LEFT JOIN Users u ON p.UserID_u_p = u.UserID_u WHERE p.id_p = ? LIMIT 1`;
		const [rows] = await connection.execute(sqlGet, [id]);
		return rows[0] || null;
	}

	static async getAll() {
		const sql = `SELECT p.id_p, p.publish_p, p.UserID_u_p, p.created_at, u.Username_u, u.Email_u FROM publish p LEFT JOIN Users u ON p.UserID_u_p = u.UserID_u ORDER BY p.id_p DESC`;
		const [rows] = await connection.execute(sql);
		return rows;
	}

	static async getByUserId(userId) {
		const sql = `SELECT id_p, publish_p, UserID_u_p, created_at FROM publish WHERE UserID_u_p = ? ORDER BY id_p DESC`;
		const [rows] = await connection.execute(sql, [userId]);
		return rows;
	}

	static async deleteById(id) {
		const sql = `DELETE FROM publish WHERE id_p = ?`;
		const [result] = await connection.execute(sql, [id]);
		return result;
	}
}
