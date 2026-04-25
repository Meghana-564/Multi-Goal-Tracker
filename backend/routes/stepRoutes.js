const express = require('express');
const router = express.Router();
const Step = require('../models/Step');
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');

// Create Step
router.post('/', auth, async (req, res) => {
  try {
    const { roadmapId } = req.body;
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    if (roadmap.createdBy.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const step = new Step(req.body);
    await step.save();
    res.status(201).json(step);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Step
router.put('/:id', auth, async (req, res) => {
  try {
    let step = await Step.findById(req.params.id);
    if (!step) return res.status(404).json({ message: 'Step not found' });

    const roadmap = await Roadmap.findById(step.roadmapId);
    if (roadmap.createdBy.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    step = await Step.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(step);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Step
router.delete('/:id', auth, async (req, res) => {
  try {
    const step = await Step.findById(req.params.id);
    if (!step) return res.status(404).json({ message: 'Step not found' });

    const roadmap = await Roadmap.findById(step.roadmapId);
    if (roadmap.createdBy.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await Step.findByIdAndDelete(req.params.id);
    res.json({ message: 'Step removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
