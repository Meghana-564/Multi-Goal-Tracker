const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
  completedSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }]
}, { timestamps: true });

// Ensure unique progress per user per roadmap
ProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
