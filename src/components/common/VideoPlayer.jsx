import React from 'react';

// Basic styling for the video wrapper to make it responsive
const videoWrapperStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%', // 16:9 Aspect Ratio
  margin: '2rem auto',
  borderRadius: '15px',
  backgroundColor: '#000',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
};

const mediaStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  border: 'none'
};

function VideoPlayer({ videoId }) {
  let isLocalVideo = false;
  if (typeof videoId === 'string' && videoId.includes('.mp4')) {
    isLocalVideo = true;
  }
  
  // Construct the correct source URL
  // For local videos, it's the path from the public folder.
  // For YouTube, it's the embed URL.
  const videoSrc = isLocalVideo
    ? `/videos/${videoId}`
    : `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={videoWrapperStyle}>
      {isLocalVideo ? (
        // Use the HTML <video> tag for local .mp4 files
        <video
          style={mediaStyle}
          controls
          src={videoSrc}
          title="Video player"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        // Use an <iframe> for YouTube videos
        <iframe
          style={mediaStyle}
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default VideoPlayer;