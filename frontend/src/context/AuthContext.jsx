import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // For local development, we're using mock data
      if (process.env.NODE_ENV === 'development') {
        // Get the user type from local storage for development/testing
        const userRole = localStorage.getItem('userRole') || 'student';
        let mockUser;
        
        if (userRole === 'parent') {
          mockUser = {
            id: 'parent-1',
            name: 'Parent User',
            email: 'parent@example.com',
            role: 'parent',
            children: [
              { id: 'alex', name: 'Alex Johnson', grade: '10th Grade' },
              { id: 'emma', name: 'Emma Johnson', grade: '8th Grade' }
            ]
          };
        } else if (userRole === 'teacher') {
          mockUser = {
            id: 'teacher-1',
            name: 'Teacher User',
            email: 'teacher@example.com',
            role: 'teacher',
            subjects: ['Mathematics', 'Physics']
          };
        } else {
          mockUser = {
            id: 'student-1',
            name: 'Alex Johnson',
            email: 'student@example.com',
            role: 'student',
            grade: '10th Grade'
          };
        }
        
        setUser(mockUser);
        setLoading(false);
        return;
      }
      
      // API call for production
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // For development/testing purpose
      if (process.env.NODE_ENV === 'development') {
        let mockUser;
        let userRole = 'student';
        
        // Simple logic to identify role based on email
        if (email.includes('parent')) {
          userRole = 'parent';
          mockUser = {
            id: 'parent-1',
            name: 'Parent User',
            email: 'parent@example.com',
            role: 'parent',
            children: [
              { id: 'alex', name: 'Alex Johnson', grade: '10th Grade' },
              { id: 'emma', name: 'Emma Johnson', grade: '8th Grade' }
            ]
          };
        } else if (email.includes('teacher')) {
          userRole = 'teacher';
          mockUser = {
            id: 'teacher-1',
            name: 'Teacher User',
            email: 'teacher@example.com',
            role: 'teacher',
            subjects: ['Mathematics', 'Physics']
          };
        } else {
          mockUser = {
            id: 'student-1',
            name: 'Alex Johnson',
            email: 'student@example.com',
            role: 'student',
            grade: '10th Grade'
          };
        }
        
        const mockToken = 'mock-jwt-token';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('userRole', userRole);
        setUser(mockUser);
        return mockUser;
      }
      
      // API call for production
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      // For development/testing purpose
      if (process.env.NODE_ENV === 'development') {
        const userRole = userData.role || 'student';
        localStorage.setItem('userRole', userRole);
        return { ...userData, id: 'new-user-1' };
      }
      
      // API call for production
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && process.env.NODE_ENV !== 'development') {
        await axios.post(`${API_URL}/api/auth/logout`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUser(null);
    }
  };

  // For testing purposes, enable role switching in development
  const switchRole = (role) => {
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('userRole', role);
      window.location.reload();
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    switchRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 