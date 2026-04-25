const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const auth = require('../middleware/auth');

router.post('/generate-roadmap', auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    const roadmapData = await aiService.generateRoadmap(prompt);
    res.json(roadmapData);
  } catch (err) {
    res.status(500).json({ message: 'AI Error' });
  }
});

router.post('/enhance-step', auth, async (req, res) => {
  try {
    const { stepContent } = req.body;
    const enhanced = await aiService.enhanceStep(stepContent);
    res.json(enhanced);
  } catch (err) {
    res.status(500).json({ message: 'AI Error' });
  }
});

router.post('/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const response = await aiService.chat(message);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'AI Error' });
  }
});

module.exports = router;
