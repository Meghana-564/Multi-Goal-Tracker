const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, min: 1, max: 5 },
    review: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', RoadmapSchema);
