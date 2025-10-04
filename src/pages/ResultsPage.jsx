import React, { useEffect } from 'react'; // Import useEffect here
import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ResultsPage.css'; // Import the new, dedicated CSS file

function ResultsPage() {
  const { storyId } = useParams();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // --- THIS IS THE MISSING PIECE OF CODE ---
  // This hook adds/removes the background class for this page
  useEffect(() => {
    document.body.classList.add('results-page-background');
    return () => {
      document.body.classList.remove('results-page-background');
    };
  }, []); // The empty array ensures this effect runs only once

  return (
    <div className="resultsPageContainer">
      <motion.div 
        className="resultsBox"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Quiz Complete!</h1>
        <h2>Your Score: {percentage}%</h2>
        <p style={{ fontSize: '1.5rem' }}>You answered {score} out of {totalQuestions} questions correctly.</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to={`/quiz/${storyId}`} className="button-link">
            Try Again
          </Link>
          <Link to="/hub" className="button-link">
            Back to Hub
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultsPage;