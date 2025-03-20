import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // If auth is still loading, we could show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  const hasRequiredRole = allowedRoles.includes(user?.role);
  
  if (!hasRequiredRole) {
    // If authenticated but wrong role, redirect to appropriate dashboard
    switch (user?.role) {
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      case 'parent':
        return <Navigate to="/parent/dashboard" replace />;
      case 'admin':
      case 'superadmin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has the required role, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 