const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['https://www.darkavengers.in/'] // Replace with your Blogger domain
}));
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!ytdl.validateURL(url)) {
        return res.status(400).send('Invalid YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

        res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
        res.setHeader('Content-Type', 'video/mp4');

        ytdl(url, { format })
            .pipe(res)
            .on('error', (err) => {
                console.error(err);
                res.status(500).send('Error downloading video');
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing video');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
