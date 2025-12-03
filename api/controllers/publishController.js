import { PublishModel } from "../models/publishModel.js";
import { connection } from "../config.js";

export class PublishController {
	static async getPublishes(req, res) {
		try {
			const publishes = await PublishModel.getAll();
			return res.status(200).json(publishes);
		} catch (error) {
			console.error("Error fetching publishes:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	static async createPublish(req, res) {
		try {
			const { publish } = req.body;
			// Only admins can publish — require authenticated session
			const sessionUser = req.session?.user;
			if (!sessionUser) return res.status(401).json({ error: "Not authenticated" });

			// If the token includes the role directly, prefer that. Otherwise fall back to DB lookup using id.
			let role = sessionUser.role || sessionUser.role || null;
			let sessionUserId = sessionUser.id || null;
			// If token didn't include role but has an id, fetch role from DB
			if (!role && sessionUserId) {
				const [rows] = await connection.execute("SELECT Role_u FROM Users WHERE UserID_u = ?", [sessionUserId]);
				role = rows?.[0]?.Role_u;
			}

			// If role came from token but id is missing, try to resolve userId from token fields (email/username)
			if (!sessionUserId) {
				const possibleEmail = sessionUser.email || sessionUser.Email || null;
				const possibleUsername = sessionUser.username || sessionUser.UserName || null;
				if (possibleEmail) {
					const [rows] = await connection.execute('SELECT UserID_u FROM Users WHERE Email_u = ?', [possibleEmail]);
					sessionUserId = rows?.[0]?.UserID_u || null;
				} else if (possibleUsername) {
					const [rows] = await connection.execute('SELECT UserID_u FROM Users WHERE Username_u = ?', [possibleUsername]);
					sessionUserId = rows?.[0]?.UserID_u || null;
				}
			}

			if (role !== "admin") return res.status(403).json({ error: "Forbidden" });

			// If we still don't have a sessionUserId, require re-login because DB needs a user id for the publish
			if (!sessionUserId) return res.status(400).json({ error: "Missing user id in token — please re-login" });

			if (!publish) {
				return res.status(400).json({ error: "Missing publish text" });
			}

			const created = await PublishModel.create({ input: { publish, userId: sessionUserId } });
			if (!created) return res.status(500).json({ error: "Failed to save publish" });
			return res.status(201).json(created);
		} catch (error) {
			console.error("Error creating publish:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	static async deletePublish(req, res) {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ error: "Missing id" });

			const sessionUser = req.session?.user;
			if (!sessionUser) return res.status(401).json({ error: "Not authenticated" });

			let role = sessionUser.role || null;
			const sessionUserId = sessionUser.id || null;
			if (!role && sessionUserId) {
				const [rows] = await connection.execute("SELECT Role_u FROM Users WHERE UserID_u = ?", [sessionUserId]);
				role = rows?.[0]?.Role_u;
			}
			if (role !== "admin") return res.status(403).json({ error: "Forbidden" });

			await PublishModel.deleteById(id);
			return res.status(200).json({ message: "Publish deleted" });
		} catch (error) {
			console.error("Error deleting publish:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	static async getByUser(req, res) {
		try {
			const { userId } = req.params;
			const publishes = await PublishModel.getByUserId(userId);
			if (!publishes || publishes.length === 0) return res.status(404).json({ message: "No publish found for user" });
			return res.status(200).json(publishes);
		} catch (error) {
			console.error("Error fetching publish by user:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
