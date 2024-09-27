import User from '../models/userModel.js';

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

        // Send response after user registration
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
      console.log(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and select password
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists and password matches
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Login success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Logout User
export const logout = (req, res) => {
    // In case of session-based auth, you'd destroy the session here
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
