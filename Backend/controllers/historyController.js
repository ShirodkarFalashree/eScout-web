const User = require("../models/userModel")

// Add search history
exports.addHistory = async (req, res) => {
    const { query, results } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.history.push({ query, results });
        await user.save();

        res.status(201).json({
            success: true,
            message: "Search history added successfully",
            history: user.history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get user search history
exports.getHistory = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select('history');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            history: user.history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
