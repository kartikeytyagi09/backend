const express = require('express');
const mongoose = require('mongoose');
const User = require('./user_model.js');

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const url = 'mongodb://127.0.0.1:27017/User';

// Connect to MongoDB
mongoose.connect(url, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB Error:', err));

// ** ROUTES **//

// Basic test route
app.get('/users/:id', async (req, res) => {
  try {
    let user = await User.find(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});


// POST route to create a new user
app.post("/user", async (req, res) => {
  try {
    

    // Create and save the user
    const newUser = await User.create(req.body);

    console.log("User Created:", newUser); // Log to terminal
    return res.status(201).json({ message: "User created successfully", data: newUser });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Could not create user",msg:error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch {
    return res.status(400).json({ err: 'cant find users data' })
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).json({ message: "no such data found" });
    return res.status(200).json({ message: "pass" })
  } catch (err) {
    return res.status(500).json({ message: "failed" });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

