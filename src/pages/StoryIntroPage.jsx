import React, { useState, useEffect } from 'react'; // Import useEffect
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/common/VideoPlayer';
import stories from '../data/stories.json';

import './SpaceWeatherIntroPage.css'; 

const cardVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 } } };
const tabContentVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function StoryIntroPage() {
  const { storyId } = useParams();
  const [activeTab, setActiveTab] = useState('video');
  const storyData = stories.find(story => story.id === storyId);

  // This hook adds/removes the background class from the body
  useEffect(() => {
    document.body.classList.add('story-intro-background');
    return () => {
      document.body.classList.remove('story-intro-background');
    };
  }, []); // The empty array ensures this runs only once

  if (!storyData) {
    return (
      <div className="page-container">
        <h1>Story not found!</h1>
        <Link to="/hub" className="button-link">Back to Hub</Link>
      </div>
    );
  }

  return (
    <motion.div
      className="page-container" // Use the generic page-container for centering
      style={{justifyContent: 'center'}} // Override to always center this page's content
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h1>{storyData.title}</h1>

      <motion.div className="intro-content-card" variants={cardVariants}>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Watch Video
          </button>
          <button
            className={`tab-button ${activeTab === 'story' ? 'active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            Read Story
          </button>
        </div>

        {activeTab === 'video' && (
          <motion.div key="video-tab" variants={tabContentVariants} initial="hidden" animate="visible">
            <h2>Introduction</h2>
            <div className="video-player-container">
              <VideoPlayer videoId={storyData.videoId} />
            </div>
            <p>{storyData.introduction}</p>
          </motion.div>
        )}

        {activeTab === 'story' && (
          <motion.div key="story-tab" variants={tabContentVariants} initial="hidden" animate="visible" className="story-content">
            {storyData.storyContent.map((content, index) => {
              if (content.type === 'paragraph') {
                return <p key={index}>{content.text}</p>;
              }
              if (content.type === 'image') {
                return <img key={index} src={content.src} alt={content.alt} />;
              }
              return null;
            })}
          </motion.div>
        )}
      </motion.div>

      <Link to={`/quiz/${storyId}`} className="button-link" style={{ marginTop: '3rem' }}>
        Ready? Start the Quiz!
      </Link>
    </motion.div>
  );
}

export default StoryIntroPage;