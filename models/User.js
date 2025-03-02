//User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});



// ✅ Ensure password is hashed before saving (ONLY IF NOT ALREADY HASHED)
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // ✅ Prevents double hashing
    try {
        const salt = await bcrypt.genSalt(10); // ✅ Ensure consistent salt rounds
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ✅ Compare passwords securely
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
