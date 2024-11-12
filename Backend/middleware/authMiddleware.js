import User from '../models/userModel.js';
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
        console.log("Token from cookies:", token); // Debug: Check if token is retrieved
    }

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Debug: Check decoded payload

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            console.log("User not found");
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        next();
    } catch (error) {
        console.error("Error verifying token:", error.message); // Debug: Check for verification errors
        res.status(401).json({ success: false, message: "Not authorized" });
    }
};
