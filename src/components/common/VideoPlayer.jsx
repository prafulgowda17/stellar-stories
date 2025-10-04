import React from 'react';

const videoWrapperStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  margin: '2rem auto',
  borderRadius: '15px',
  backgroundColor: '#000',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
};

const mediaStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none'
};

function VideoPlayer({ videoId }) {
  let videoSrc = '';
  const isLocalVideo = typeof videoId === 'string' && videoId.includes('.mp4');
  
  if (isLocalVideo) {
    // THIS IS THE CRITICAL FIX
    // We construct the path using the project's base URL.
    // On local dev, this is '/', on GitHub Pages it will be '/stellar-stories/'
    videoSrc = `${import.meta.env.BASE_URL}videos/${videoId}`;
  } else {
    // YouTube links remain the same
    videoSrc = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div style={videoWrapperStyle}>
      {isLocalVideo ? (
        <video
          style={mediaStyle}
          controls
          src={videoSrc}
          title="Video player"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
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