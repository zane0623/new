import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import TeacherDashboard from './pages/teacher/Dashboard';
import ClassManagement from './pages/teacher/ClassManagement';
import ResourceLibrary from './pages/teacher/ResourceLibrary';
import PracticeSets from './pages/teacher/PracticeSets';
import Analytics from './pages/teacher/Analytics';
import ParentCommunication from './pages/teacher/ParentCommunication';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute>
              <ClassManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/resources"
          element={
            <ProtectedRoute>
              <ResourceLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/practice"
          element={
            <ProtectedRoute>
              <PracticeSets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/communication"
          element={
            <ProtectedRoute>
              <ParentCommunication />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App; 