import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainAppLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        {/* The Outlet will render the specific page component (Hub, Quiz, etc.) */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default MainAppLayout;