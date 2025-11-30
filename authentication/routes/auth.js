const express = require("express");
const User = require("../models/user.js");
const { generateToken } = require("../auth/jwtMiddleware");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    try {
        const user = await User.create({ username, password });
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    }  
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ userId: user._id });
    res.json({ message: "Login successful", token });
});

module.exports = router;
