import { connection } from "../config.js";

export class PublishModel {
	static async create({ input }) {
		const { publish, userId } = input;
		// Use upsert behavior so each user keeps a single publish row
		// Set created_at to NOW() on insert and update it on duplicate so frontend can show timestamp
		const sql = `INSERT INTO publish (publish_p, UserID_u_p, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE publish_p = VALUES(publish_p), created_at = NOW()`;
		const [result] = await connection.execute(sql, [publish, userId]);
		// Determine the id of the affected row. If insertId is 0 it was an update for this user.
		let id = result.insertId || null;
		if (!id) {
			const [rows] = await connection.execute(`SELECT id_p FROM publish WHERE UserID_u_p = ? LIMIT 1`, [userId]);
			id = rows?.[0]?.id_p || null;
		}
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
		const sql = `SELECT id_p, publish_p, UserID_u_p, created_at FROM publish WHERE UserID_u_p = ?`;
		const [rows] = await connection.execute(sql, [userId]);
		return rows[0];
	}

	static async deleteById(id) {
		const sql = `DELETE FROM publish WHERE id_p = ?`;
		const [result] = await connection.execute(sql, [id]);
		return result;
	}
}
