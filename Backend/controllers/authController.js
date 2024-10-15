import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate JWT token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false, // Must be false for localhost (use true for HTTPS)
            sameSite: 'lax', // Allows cookies to be sent in most cases
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            token, // Send token in the response
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false, // Must be false for localhost (use true for HTTPS)
            sameSite: 'lax', // Allows cookies to be sent in most cases
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token, // Send token in the response
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Logout User
export const logout = (req, res) => {
    // Clear the cookie
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set the cookie to expire in the past
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
