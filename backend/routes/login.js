import User from '../models/userSchema.js';
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.MatchPassword(password);
        
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated:", token);
        res.json({ token }); // Send token back to the client

    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
