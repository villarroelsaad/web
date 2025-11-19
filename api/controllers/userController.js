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
            const existingUser = await UserModel.findByUsername({ username: result.data.username });


            if (existingUser) {
                return res.status(409).json({ error: 'Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(result.data.password, 10)
            const data = ({ ...result.data, password: hashedPassword })

            await UserModel.register({ input: data })
            console.log('User created successfully')
        } catch (error) {
            console.error('Error registering user:', error);
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

            const user = await UserModel.findByUsername({ username });

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.UserPassword_u);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const { UserPassword_u: _, ...authUser } = user;  // Exclude password from response

            // Create a JWT token and set it in the cookies
            const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
            // When the frontend and API are on different origins, the cookie must allow cross-site
            // transmission. Use SameSite='none' and Secure in production so the browser will send
            // the cookie with cross-origin requests when `credentials: 'include'` is used.
            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 1000 * 60 * 60 // 1 hour
            });

            return res.status(200).json({ message: 'Login successful', authUser });
        } catch (error) {
            console.error('Error registering user:', error);
            console.error('Error logging in user:', error);
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
            const user = await UserModel.getUserById({ id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await UserModel.deleteUser({ id });
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
            const user = await UserModel.getUserById({ id });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await UserModel.editUser({ id, input: result.data });
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}