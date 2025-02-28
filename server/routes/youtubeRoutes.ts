// This file defines the routes for YouTube-related API endpoints.
// It uses the YouTube controller to handle the logic for searching YouTube videos.

import { Router } from 'express';
import { searchYouTube } from '../controllers/youtubeController';

const router = Router();

router.post('/search', async (req, res) => {
  const { query } = req.body;
  const video = await searchYouTube(query);
  if (video) {
    res.json(video);
  } else {
    res.status(500).json({ error: 'Failed to search YouTube' });
  }
});

export default router;