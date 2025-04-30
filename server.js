// server.js

// Disable ytdl-core auto update check
process.env.YTDL_NO_UPDATE = 'true';

// Import packages
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Routes

// Test route
app.get('/', (req, res) => {
  res.send('YouTube Video Downloader API is running ✅');
});

// Download route
app.get('/download', async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    ytdl(videoURL, { format: format }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
