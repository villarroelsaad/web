import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validateUser, validatePartialUser } from '../schema/users.js';
import { UserModel } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config()

export class UserController {

    static async getUsers(req, res) {
        try {
            const users = await UserModel.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }



    static async register(req, res) {
        // Validate the request body against the schema
        const result = validateUser(req.body);
        try {
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });

            }
            // Check if the user already exists
            const existingUser = await UserModel.findByUsername(result.data.username);
            if (existingUser) {
                return res.status(409).json({ error: 'Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(result.data.password, 10);
            const userInput = {
                username: result.data.username,
                email: result.data.email,
                hashedPassword,
                role: result.data.role || 'user'
            };
            await UserModel.register({ input: userInput });
            console.log('User created successfully')
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
    }


    static async login(req, res) {
        // Validate the request body against the schema
        const result = validatePartialUser(req.body);
        try {
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            const { username, password } = result.data;
            console.log('Login attempt for username:', username);
            const user = await UserModel.findByUsername(username);
            console.log('User fetched from DB:', user ? { Username_u: user.Username_u, Role_u: user.Role_u } : null);

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Compare the provided password with the hashed password in the database

            const isPasswordValid = await bcrypt.compare(password, user.UserPassword_u);
            console.log('Password match result for', username, ':', isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const { UserPassword_u: _, ...authUser } = user;
            // Try to extract a stable id and role for the token payload
            const userId = user.UserID_u || user.id || user.UserID || null;
            const userRole = user.Role_u || user.Role || null;
            // Create a JWT token and set it in the cookies
            const tokenPayload = {};
            if (userId) tokenPayload.id = userId;
            if (userRole) tokenPayload.role = userRole;
            const token = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 3600000 // 1 hora en milisegundos
            });
            // Return authUser only; token is stored as an httpOnly cookie for security
            return res.status(200).json({ message: 'Login successful', authUser });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
    static async logOut(req, res) {
        try {
            res.clearCookie('access_token', { path: '/', sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await UserModel.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async editUser(req, res) {
        const { id } = req.params;
        const result = validatePartialUser(req.body);
        try {
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const user = await UserModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await UserModel.editUser(id, result.data);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}