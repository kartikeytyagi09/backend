const mongoose = require('mongoose');

async function connect(url) {
    try {
        await mongoose.connect(url);
        console.log("Mongoose connected");
    } catch (err) {
        console.log("Failed to connect to Mongoose:", err);
    }
}

module.exports = { connect };
