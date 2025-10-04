import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar'
// We will create these page components in the next steps
// For now, the import statements will show an error, which is okay.
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SpaceWeatherIntroPage from './pages/SpaceWeatherIntroPage';
import HubPage from './pages/HubPage';
import StoryIntroPage from './pages/StoryIntroPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

// This is a helper component to protect our routes
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Protected Routes --- */}
        {/* Only logged-in users will be able to see these pages */}
        <Route
          path="/intro"
          element={<ProtectedRoute><SpaceWeatherIntroPage /></ProtectedRoute>}
        />
        <Route
          path="/hub"
          element={<ProtectedRoute><HubPage /></ProtectedRoute>}
        />
        <Route
          path="/story/:storyId"
          element={<ProtectedRoute><StoryIntroPage /></ProtectedRoute>}
        />
        <Route
          path="/quiz/:storyId"
          element={<ProtectedRoute><QuizPage /></ProtectedRoute>}
        />
        <Route
          path="/results/:storyId"
          element={<ProtectedRoute><ResultsPage /></ProtectedRoute>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;