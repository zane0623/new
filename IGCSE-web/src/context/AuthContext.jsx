import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to check if token is valid and not expired
  const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired
      if (decoded.exp < currentTime) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  };

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('auth_token');
      
      if (isTokenValid(token)) {
        // Decode token to get user info
        const userData = jwtDecode(token);
        
        // Set auth state
        setIsAuthenticated(true);
        setUser(userData);
        
        // Set authorization header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        // Clear invalid token
        localStorage.removeItem('auth_token');
        delete axios.defaults.headers.common['Authorization'];
        
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, mock the API call with a dummy response
      // In a real application, this would be an actual API call:
      // const response = await axios.post('/api/auth/login', credentials);
      
      // Mock implementation for development
      const mockUsers = {
        'student@example.com': {
          id: '1',
          name: 'Student User',
          email: 'student@example.com',
          role: 'student',
        },
        'parent@example.com': {
          id: '2',
          name: 'Parent User',
          email: 'parent@example.com',
          role: 'parent',
        },
        'admin@example.com': {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        },
      };
      
      // Simulate API response
      let mockResponse;
      const mockUser = mockUsers[credentials.email];
      
      if (mockUser && credentials.password === 'password') {
        // Create a mock token (in a real app this would come from the server)
        const token = btoa(JSON.stringify({
          ...mockUser,
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
        }));
        
        mockResponse = {
          data: {
            user: mockUser,
            token,
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
      
      // Handle successful login
      const { token, user: userData } = mockResponse.data;
      
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setIsAuthenticated(true);
      setUser(userData);
      setLoading(false);
      
      return userData;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, mock the API call
      // In a real application, this would be:
      // const response = await axios.post('/api/auth/register', userData);
      
      // Simulate successful registration
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
      };
      
      // Create a mock token
      const token = btoa(JSON.stringify({
        ...mockUser,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
      }));
      
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setIsAuthenticated(true);
      setUser(mockUser);
      setLoading(false);
      
      return mockUser;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
    
    setIsAuthenticated(false);
    setUser(null);
  };

  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, this would be:
      // await axios.post('/api/auth/reset-password-request', { email });
      
      // For now, just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to request password reset');
      throw err;
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, this would be:
      // const response = await axios.put('/api/users/profile', profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user state with new data
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      setLoading(false);
      return updatedUser;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };

  // Context value
  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    requestPasswordReset,
    updateProfile,
  };

  // Provide the auth context value to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 