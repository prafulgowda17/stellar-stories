import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import stories from '../data/stories.json';
import './QuizPage.css';

function QuizPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const storyData = stories.find(story => story.id === storyId);
  const quizQuestions = storyData.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);

  // --- THIS IS THE MISSING PIECE OF CODE ---
  // This hook adds/removes the background class for this page
  useEffect(() => {
    document.body.classList.add('quiz-page-background');
    return () => {
      document.body.classList.remove('quiz-page-background');
    };
  }, []); // The empty array ensures this effect runs only once

  const handleNextQuestion = () => {
    if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].correctOptionIndex) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswerIndex(null);
    } else {
      const finalScore = score + (selectedAnswerIndex === quizQuestions[currentQuestionIndex].correctOptionIndex ? 1 : 0);
      navigate(`/results/${storyId}`, { state: { score: finalScore, totalQuestions: quizQuestions.length } });
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quizPageContainer">
      <motion.div
        className="quizBox"
        key={currentQuestionIndex} // This makes each new question animate in
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{storyData.title} Quiz</h2>
        <p>Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
        <h3>{currentQuestion.questionText}</h3>
        
        <ul className="optionsList">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <button 
                className={`optionButton ${selectedAnswerIndex === index ? 'selected' : ''}`}
                onClick={() => setSelectedAnswerIndex(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        
        <button 
          className="button-link"
          onClick={handleNextQuestion}
          disabled={selectedAnswerIndex === null}
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </motion.div>
    </div>
  );
}

export default QuizPage;