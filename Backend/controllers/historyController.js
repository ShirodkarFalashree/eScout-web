import User from '../models/userModel.js';

export const addHistory = async (req, res) => {
    const { query, response, images } = req.body; // Accept images in the request body
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.history.push({ query, response, images }); // Store images in history
        await user.save();

        res.status(201).json({
            success: true,
            message: "Search history added successfully",
            history: user.history
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const getHistory = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select('history');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            history: user.history
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
