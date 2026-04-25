const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  badges: [{ type: String }],
  currentStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
  themePreference: { type: String, default: 'dark' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
