const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true }
    // Add any other fields as needed
   
}, { collection: 'userData' });

userSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
