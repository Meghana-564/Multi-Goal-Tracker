const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true }
}, { timestamps: true });

// Ensure user can bookmark a roadmap only once
BookmarkSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
