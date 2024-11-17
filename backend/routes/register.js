import User from '../models/userSchema.js';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, username });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token as an object
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server problem" });
  }
});

export default router;
