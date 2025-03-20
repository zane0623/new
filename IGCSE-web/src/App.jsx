import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import ExamSimulation from './pages/student/ExamSimulation';
import StudentProfile from './pages/student/Profile';
import Results from './pages/student/Results';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ParentProfile from './pages/parent/Profile';
import StudentProgress from './pages/parent/StudentProgress';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';

// Shared Pages
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

// Auth Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          
            {/* Student routes */}
            <Route path="student" element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="exams" element={<ExamSimulation />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="results" element={<Results />} />
            </Route>
            
            {/* Parent routes */}
            <Route path="parent" element={<ProtectedRoute allowedRoles={['parent']} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ParentDashboard />} />
              <Route path="profile" element={<ParentProfile />} />
              <Route path="student-progress" element={<StudentProgress />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="admin" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 