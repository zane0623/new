import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import ClassOverview from '../../components/teacher/ClassOverview';
import StudentProgress from '../../components/teacher/StudentProgress';
import ResourceSummary from '../../components/teacher/ResourceSummary';
import NotificationCenter from '../../components/shared/NotificationCenter';
import TimeManagement from '../../components/teacher/TimeManagement';
import ErrorAnalysis from '../../components/teacher/ErrorAnalysis';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    classes: [],
    studentProgress: [],
    resources: [],
    notifications: [],
    timeManagement: {},
    errorAnalysis: {}
  });

  useEffect(() => {
    // Fetch dashboard data
    // TODO: Implement API calls
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'progress', label: 'Student Progress' },
    { id: 'resources', label: 'Resources' },
    { id: 'time', label: 'Time Management' },
    { id: 'errors', label: 'Error Analysis' }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => navigate('/teacher/classes')}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 className="font-semibold">Manage Classes</h3>
            <p className="text-sm text-gray-600">View and manage your classes</p>
          </button>
          <button
            onClick={() => navigate('/teacher/practice-sets')}
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h3 className="font-semibold">Create Practice Set</h3>
            <p className="text-sm text-gray-600">Create new practice materials</p>
          </button>
          <button
            onClick={() => navigate('/teacher/parent-communication')}
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <h3 className="font-semibold">Parent Communication</h3>
            <p className="text-sm text-gray-600">Send updates to parents</p>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              <ClassOverview classes={dashboardData.classes} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StudentProgress data={dashboardData.studentProgress} />
                <ResourceSummary data={dashboardData.resources} />
              </div>
            </>
          )}
          
          {activeTab === 'progress' && (
            <StudentProgress data={dashboardData.studentProgress} />
          )}
          
          {activeTab === 'resources' && (
            <ResourceSummary data={dashboardData.resources} />
          )}
          
          {activeTab === 'time' && (
            <TimeManagement data={dashboardData.timeManagement} />
          )}
          
          {activeTab === 'errors' && (
            <ErrorAnalysis data={dashboardData.errorAnalysis} />
          )}
        </div>

        {/* Notification Center */}
        <div className="fixed bottom-4 right-4">
          <NotificationCenter notifications={dashboardData.notifications} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard; 