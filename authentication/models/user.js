// database schema for user for password of user

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, "Enter username"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// hashing the password begre saving 

userSchema.pre("save", async function(next){

    //checking if password is changed or not to avoid unnecessary re-hashing of the password if it hasn't changed.

    if(!this.isModified("password"))  return next();  // Skip if password is unchanged
    this.password= await bcrypt.hash(this.password, 10);
    next();
} )



// Compare hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const USER= mongoose.model("User",userSchema);
module.exports=USER;
