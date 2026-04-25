const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
  title: { type: String, required: true },
  description: { type: String },
  resourceLinks: [{ type: String }],
  order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Step', StepSchema);
