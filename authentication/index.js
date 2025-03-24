const express = require("express");
const { connect } = require("./view/connect.js");
const route = require("./routes/auth");

const { verifyToken } = require("./auth/jwtMiddleware"); // Fixed Path
const User = require("./models/user.js"); // Fixed Path

const app = express();
const port = 2002;

app.use(express.json());

connect("mongodb://127.0.0.1:27017/short-url").catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// 🔹 Ensure this comes after route middleware
app.use("/", route);

// 🔹 GET Route for fetching users (Requires Token)
app.get("/user", verifyToken, async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Excluding password
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

app.listen(port, () => console.log(`Server listening at port ${port}`));
