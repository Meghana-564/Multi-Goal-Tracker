const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const auth = require('../middleware/auth');

// Add Bookmark
router.post('/', auth, async (req, res) => {
  try {
    const { roadmapId } = req.body;
    const existing = await Bookmark.findOne({ userId: req.user.id, roadmapId });
    if (existing) return res.status(400).json({ message: 'Already bookmarked' });

    const bookmark = new Bookmark({ userId: req.user.id, roadmapId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Bookmarks
router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id }).populate('roadmapId');
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove Bookmark
router.delete('/:roadmapId', auth, async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ userId: req.user.id, roadmapId: req.params.roadmapId });
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
