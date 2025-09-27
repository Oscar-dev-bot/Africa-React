/**
 * @file AuthContext.jsx
 * @description Authentication Context Provider for East African Hub
 * 
 * This context manages user authentication state across the entire application.
 * It provides login, logout, registration, and user session management functionality.
 * 
 * Features:
 * - User login/logout state management
 * - Registration with form validation
 * - Password reset functionality
 * - Role-based access control (subscriber, customer, admin)
 * - Session persistence using localStorage
 * - Error handling and loading states
 * 
 * @author Manus AI
 * @created 2025-09-26
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Authentication Context
const AuthContext = createContext();

/**
 * Custom hook to use the Authentication Context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the entire application to provide authentication state
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  // User state management
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize authentication state on component mount
   * Checks for existing user session in localStorage
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for stored user session
        const storedUser = localStorage.getItem('eah_user');
        const storedToken = localStorage.getItem('eah_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('eah_user');
        localStorage.removeItem('eah_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * User Login Function
   * Authenticates user with email/username and password
   * 
   * @param {string} email - User email or username
   * @param {string} password - User password
   * @param {boolean} rememberMe - Whether to persist session
   * @returns {Promise<Object>} Login result
   */
  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to backend
      // For now, simulate API call with mock data
      const response = await mockApiCall('/api/auth/login', {
        email,
        password,
        rememberMe
      });

      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          companyName: response.user.companyName,
          role: response.user.role, // 'subscriber', 'customer', 'admin'
          avatar: response.user.avatar
        };

        setUser(userData);
        
        // Store session data
        localStorage.setItem('eah_user', JSON.stringify(userData));
        localStorage.setItem('eah_token', response.token);
        
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User Registration Function
   * Creates new user account with validation
   * 
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.companyName - User's company name (optional)
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - User's password
   * @param {string} userData.accountType - Account type ('subscriber' or 'customer')
   * @returns {Promise<Object>} Registration result
   */
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to backend
      const response = await mockApiCall('/api/auth/register', userData);

      if (response.success) {
        // Auto-login after successful registration
        const loginResult = await login(userData.email, userData.password);
        return loginResult;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during registration';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Password Reset Request Function
   * Sends password reset email to user
   * 
   * @param {string} email - User's email address
   * @returns {Promise<Object>} Reset request result
   */
  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to backend
      const response = await mockApiCall('/api/auth/reset-password', { email });

      if (response.success) {
        return { success: true, message: 'Password reset email sent successfully' };
      } else {
        throw new Error(response.message || 'Password reset request failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during password reset request';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Password Change Function
   * Changes user's password (requires current password)
   * 
   * @param {string} currentPassword - User's current password
   * @param {string} newPassword - User's new password
   * @returns {Promise<Object>} Password change result
   */
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to backend
      const response = await mockApiCall('/api/auth/change-password', {
        currentPassword,
        newPassword,
        userId: user.id
      });

      if (response.success) {
        return { success: true, message: 'Password changed successfully' };
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during password change';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User Logout Function
   * Clears user session and redirects to home
   */
  const logout = () => {
    setUser(null);
    setError(null);
    
    // Clear stored session data
    localStorage.removeItem('eah_user');
    localStorage.removeItem('eah_token');
  };

  /**
   * Check if user has specific role
   * @param {string} role - Role to check ('subscriber', 'customer', 'admin')
   * @returns {boolean} Whether user has the role
   */
  const hasRole = (role) => {
    return user && user.role === role;
  };

  /**
   * Check if user is authenticated
   * @returns {boolean} Whether user is logged in
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  // Context value object
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    requestPasswordReset,
    changePassword,
    hasRole,
    isAuthenticated,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Mock API Call Function
 * Simulates backend API calls for development
 * TODO: Replace with actual API integration
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @returns {Promise<Object>} Mock response
 */
const mockApiCall = async (endpoint, data) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock responses based on endpoint
  switch (endpoint) {
    case '/api/auth/login':
      // Mock login validation
      if (data.email === 'admin@eastafricanhub.com' && data.password === 'admin123') {
        return {
          success: true,
          user: {
            id: 1,
            email: 'admin@eastafricanhub.com',
            firstName: 'Admin',
            lastName: 'User',
            companyName: 'East African Hub',
            role: 'admin',
            avatar: null
          },
          token: 'mock_jwt_token_admin'
        };
      } else if (data.email === 'user@example.com' && data.password === 'password123') {
        return {
          success: true,
          user: {
            id: 2,
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            companyName: 'Example Company',
            role: 'subscriber',
            avatar: null
          },
          token: 'mock_jwt_token_user'
        };
      } else {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

    case '/api/auth/register':
      // Mock registration (always succeeds for demo)
      return {
        success: true,
        message: 'Registration successful'
      };

    case '/api/auth/reset-password':
      // Mock password reset (always succeeds for demo)
      return {
        success: true,
        message: 'Password reset email sent'
      };

    case '/api/auth/change-password':
      // Mock password change (always succeeds for demo)
      return {
        success: true,
        message: 'Password changed successfully'
      };

    default:
      return {
        success: false,
        message: 'Unknown endpoint'
      };
  }
};

export default AuthProvider;
