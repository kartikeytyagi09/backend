const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true,"enter firstname"], 
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true,"enter email"], 
      unique: [true,'must be unique'],
    },
  },{timestamps: true});
  
module.exports = mongoose.model('User', userSchema);
  