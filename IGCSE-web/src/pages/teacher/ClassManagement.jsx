import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ClassManagement = () => {
  const [activeTab, setActiveTab] = useState('classes');

  // Mock data - replace with actual data
  const mockClasses = [
    {
      id: 1,
      name: 'IGCSE Mathematics A',
      students: 25,
      schedule: 'Mon, Wed, Fri 9:00-10:30',
      status: 'active'
    },
    {
      id: 2,
      name: 'IGCSE Physics',
      students: 20,
      schedule: 'Tue, Thu 11:00-12:30',
      status: 'active'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Class Management</h1>
          <button
            onClick={() => {/* TODO: Show create class modal */}}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Class
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('classes')}
              className={`py-2 px-4 ${
                activeTab === 'classes'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Classes
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-2 px-4 ${
                activeTab === 'students'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-2 px-4 ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Schedule
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'classes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClasses.map(classItem => (
                <div
                  key={classItem.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{classItem.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Students: {classItem.students}</p>
                    <p>Schedule: {classItem.schedule}</p>
                    <p>Status: <span className="text-green-600">{classItem.status}</span></p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {/* TODO: Edit class */}}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {/* TODO: View details */}}
                      className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Student Management</h2>
              <div className="space-y-4">
                {/* TODO: Add student management interface */}
                <p className="text-gray-500">Student management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Schedule Management</h2>
              <div className="space-y-4">
                {/* TODO: Add schedule management interface */}
                <p className="text-gray-500">Schedule management interface coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClassManagement; 