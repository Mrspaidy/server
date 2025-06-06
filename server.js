const ytdl = require('ytdl-core');
const fs = require('fs');
const videoId = 'ENTER_YOUTUBE_VIDEO_ID_OR_URL_HERE';
// Get video info from YouTube
ytdl.getInfo(videoId).then((info) => {
  // Select the video format and quality
  const format = ytdl.chooseFormat(info.formats,{quality:"248"});
  // Create a write stream to save the video file
  const outputFilePath = `${info.videoDetails.title}.${videoFormat.container}`;
  const outputStream = fs.createWriteStream(outputFilePath);
  // Download the video file
  ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
  // When the download is complete, show a message
  outputStream.on('finish', () => {
    console.log(`Finished downloading: ${outputFilePath}`);
  });
}).catch((err) => {
  console.error(err);
});
