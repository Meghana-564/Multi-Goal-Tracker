const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Update Progress
router.post('/update', auth, async (req, res) => {
  try {
    const { roadmapId, completedSteps } = req.body;
    let progress = await Progress.findOne({ userId: req.user.id, roadmapId });

    let newStepsCompleted = 0;

    if (progress) {
      const previousCount = progress.completedSteps.length;
      newStepsCompleted = completedSteps.length - previousCount;
      progress.completedSteps = completedSteps;
      await progress.save();
    } else {
      newStepsCompleted = completedSteps.length;
      progress = new Progress({
        userId: req.user.id,
        roadmapId,
        completedSteps
      });
      await progress.save();
    }

    if (newStepsCompleted > 0) {
      const xpGained = newStepsCompleted * 10;
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { xp: xpGained },
        $set: { lastActiveDate: new Date() }
      });
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Progress for a Roadmap
router.get('/:roadmapId', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id, roadmapId: req.params.roadmapId });
    if (!progress) return res.json({ completedSteps: [] });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
