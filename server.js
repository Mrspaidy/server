process.env.YTDL_NO_UPDATE = 'true';
const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid YouTube URL');
  }
  
  const info = await ytdl.getInfo(videoURL);
  res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

  ytdl(videoURL, { format: 'mp4' }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
