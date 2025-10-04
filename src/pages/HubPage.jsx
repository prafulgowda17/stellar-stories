import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import stories from '../data/stories.json';
import './hubpage.css'; // Import the dedicated CSS file

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const MotionLink = motion(Link);

function HubPage() {
  // This hook adds the 'hub-page-background' class to the body,
  // which triggers the animation in our CSS file.
  useEffect(() => {
    document.body.classList.add('hub-page-background');
    return () => {
      document.body.classList.remove('hub-page-background');
    };
  }, []);

  return (
    <div 
      className="page-container"
      style={{ justifyContent: 'flex-start' }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Mission Hub
      </motion.h1>
      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select a story to begin your next adventure.
      </motion.p>

      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
          width: '100%'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map((story) => (
          <MotionLink
            key={story.id}
            to={`/story/${story.id}`}
            className="hub-card"
            variants={cardVariants}
          >
            <img src={story.illustration} alt={story.title} className="hub-card-image" />
            <h3 style={{ color: 'var(--highlight-color)' }}>{story.title}</h3>
            <p style={{ textAlign: 'left', fontSize: '0.9rem', margin: 0 }}>
              {story.introduction.substring(0, 100)}...
            </p>
          </MotionLink>
        ))}
      </motion.div>
    </div>
  );
}

export default HubPage;