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
			const sessionUserId = req.session?.user?.id;
			if (!sessionUserId) return res.status(401).json({ error: "Not authenticated" });

			// verify role from DB
			const [rows] = await connection.execute("SELECT Role_u FROM Users WHERE UserID_u = ?", [sessionUserId]);
			const role = rows?.[0]?.Role_u;
			if (role !== "admin") return res.status(403).json({ error: "Forbidden" });

			if (!publish) {
				return res.status(400).json({ error: "Missing publish text" });
			}

			await PublishModel.create({ input: { publish, userId: sessionUserId } });
			return res.status(201).json({ message: "Publish saved" });
		} catch (error) {
			console.error("Error creating publish:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	static async deletePublish(req, res) {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ error: "Missing id" });

			const sessionUserId = req.session?.user?.id;
			if (!sessionUserId) return res.status(401).json({ error: "Not authenticated" });

			// verify role from DB
			const [rows] = await connection.execute("SELECT Role_u FROM Users WHERE UserID_u = ?", [sessionUserId]);
			const role = rows?.[0]?.Role_u;
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
			const publish = await PublishModel.getByUserId(userId);
			if (!publish) return res.status(404).json({ message: "No publish found for user" });
			return res.status(200).json(publish);
		} catch (error) {
			console.error("Error fetching publish by user:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
