'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Sign Up
  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Create new user with ID
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    // Store in users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set as current user (without password)
    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Log In
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Log Out
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  // Update User Profile
  const updateUser = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('users', JSON.stringify(users));

      const updatedUser = { ...user, ...updatedData };
      const { password, ...userWithoutPassword } = updatedUser;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      return userWithoutPassword;
    }

    throw new Error('User not found');
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
