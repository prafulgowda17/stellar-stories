import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navStyle = {
  backgroundColor: 'var(--secondary-color)',
  padding: '1rem 2rem',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
};

const navBrandStyle = {
  color: 'var(--highlight-color)',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textDecoration: 'none',
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoutButtonStyle = {
  background: 'var(--accent-color)',
  color: 'var(--text-color)',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the welcome page after logout
  };

  return (
    <nav style={navStyle}>
      <Link to="/hub" style={navBrandStyle}>
        Solar Surprise Hub
      </Link>
      {user && (
        <div style={userInfoStyle}>
          <span>Welcome, {user.username}!</span>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;