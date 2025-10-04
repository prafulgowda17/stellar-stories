import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './LoginPage.css'; // Import the new dedicated CSS

// Animation variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.classList.add('login-page-background');
    return () => {
      document.body.classList.remove('login-page-background');
    };
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!username.trim()) {
      setError('Please enter a Call Sign to begin.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      login(username);
      navigate('/intro');
    }, 1000);
  };

  return (
    <motion.div
      className="loginPageContainer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} style={{ fontSize: '4rem' }}>
        Explorer Login
      </motion.h1>
      <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
        Enter your username to begin the mission.
      </motion.p>
      
      <motion.div 
        className="login-form-area" // Use the new class for the wider area
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="call-sign">username</label>
            <motion.input
              type="text"
              id="call-sign"
              value={username}
              onChange={handleUsernameChange}
              placeholder="e.g., AstroAlex"
              whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px var(--highlight-color)" }}
              style={{ marginBottom: '1.5rem' }} // Add space before the button
            />
          </div>
          
          <motion.button 
            type="submit" 
            className="button-link" 
            style={{ width: '100%', fontSize: '1.3rem', padding: '18px' }} // Make button larger
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Launching...' : 'login  '}
          </motion.button>

          <motion.p 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: error ? 1 : 0 }}
          >
            {error || '\u00A0'}
          </motion.p>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;