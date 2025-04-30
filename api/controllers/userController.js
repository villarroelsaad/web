import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validateUser, validatePartialUser } from '../schema/users';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config()

export class UserController {

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
            const hashedPassword = bcrypt.hash(result.data.password, 10)
            await UserModel.create({ input: result.data, hashedPassword })
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
            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const { password: _, ...authUser } = user
            // Create a JWT token and set it in the cookies
            const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true
            })
            res.status(200).json({ message: 'Login successful' });
            return res.json({ authUser });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
    static async logOut(req, res) {
        try {
            res.clearCookie('access_token');
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