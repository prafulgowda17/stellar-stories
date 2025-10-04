import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const backgroundImageURL = "https://www.setaswall.com/wp-content/uploads/2019/01/Astronaut-Wallpaper-42-5200x3250.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" } }
};

function WelcomePage() {
  return (
    <motion.div
      className="page-container welcome-page"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImageURL})`,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} style={{fontSize: '4.5rem'}}>
        Solar Surprise
      </motion.h1>
      <motion.p variants={itemVariants} style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--highlight-color)' }}>
        An Interactive Space Weather Adventure
      </motion.p>
      <motion.p variants={itemVariants}>
        Journey from the Sun to the Earth, discover the science of space weather,
        and test your knowledge in this cosmic adventure.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link to="/login" className="button-link" style={{ marginTop: '2rem' }}>
          Begin Your Adventure
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default WelcomePage;