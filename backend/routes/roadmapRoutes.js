const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');
const Step = require('../models/Step');
const auth = require('../middleware/auth');

// Create Roadmap
router.post('/', auth, async (req, res) => {
  try {
    const roadmap = new Roadmap({ ...req.body, createdBy: req.user.id });
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Public Roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ isPublic: true }).populate('createdBy', 'name');
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Roadmaps
router.get('/my-roadmaps', auth, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ createdBy: req.user.id });
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Single Roadmap
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate('createdBy', 'name');
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    
    const steps = await Step.find({ roadmapId: req.params.id }).sort('order');
    res.json({ ...roadmap._doc, steps });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Roadmap
router.put('/:id', auth, async (req, res) => {
  try {
    let roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    if (roadmap.createdBy.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Roadmap
router.delete('/:id', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    if (roadmap.createdBy.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await Roadmap.findByIdAndDelete(req.params.id);
    await Step.deleteMany({ roadmapId: req.params.id });
    res.json({ message: 'Roadmap removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Clone Roadmap
router.post('/:id/clone', auth, async (req, res) => {
  try {
    const originalRoadmap = await Roadmap.findById(req.params.id);
    if (!originalRoadmap) return res.status(404).json({ message: 'Roadmap not found' });

    const clonedRoadmap = new Roadmap({
      title: `${originalRoadmap.title} (Clone)`,
      description: originalRoadmap.description,
      category: originalRoadmap.category,
      createdBy: req.user.id,
      isPublic: false
    });
    await clonedRoadmap.save();

    const originalSteps = await Step.find({ roadmapId: req.params.id });
    const clonedSteps = originalSteps.map(step => ({
      roadmapId: clonedRoadmap._id,
      title: step.title,
      description: step.description,
      resourceLinks: step.resourceLinks,
      order: step.order
    }));

    if (clonedSteps.length > 0) {
      await Step.insertMany(clonedSteps);
    }

    res.status(201).json(clonedRoadmap);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
