import React from 'react';
import { motion } from 'framer-motion';
import './ContentBlock.css'; // We will create this CSS file next

const contentVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2
    }
  }
};

// This component will accept a title, an image source, an alt text, and children (for the text content)
function ContentBlock({ title, imgSrc, imgAlt, children }) {
  return (
    <motion.div
      className="content-block"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="text-content" variants={contentVariants}>
        <h3>{title}</h3>
        {children}
      </motion.div>
      <motion.div className="image-content" variants={contentVariants}>
        <img src={imgSrc} alt={imgAlt} />
      </motion.div>
    </motion.div>
  );
}

export default ContentBlock;