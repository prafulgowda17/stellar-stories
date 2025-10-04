import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // In a real app, this would involve a password check.
  // For our hackathon, we'll just set a user object.
  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This is a custom hook that makes it easy to use our context
export function useAuth() {
  return useContext(AuthContext);
}