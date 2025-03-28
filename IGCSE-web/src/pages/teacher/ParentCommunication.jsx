import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ParentCommunication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data
  const mockData = {
    messages: [
      {
        id: 1,
        parent: 'John Doe Sr.',
        student: 'John Doe',
        subject: 'IGCSE Mathematics A',
        message: 'How is my son performing in class?',
        date: '2024-03-26',
        status: 'unread'
      },
      {
        id: 2,
        parent: 'Jane Smith',
        student: 'Jane Smith Jr.',
        subject: 'IGCSE Physics',
        message: 'Thank you for the progress report.',
        date: '2024-03-25',
        status: 'read'
      }
    ],
    meetings: [
      {
        id: 1,
        parent: 'John Doe Sr.',
        student: 'John Doe',
        date: '2024-03-28',
        time: '14:00',
        status: 'scheduled'
      },
      {
        id: 2,
        parent: 'Jane Smith',
        student: 'Jane Smith Jr.',
        date: '2024-03-29',
        time: '15:30',
        status: 'scheduled'
      }
    ],
    templates: [
      {
        id: 1,
        title: 'Progress Report',
        description: 'Standard progress report template',
        category: 'report'
      },
      {
        id: 2,
        title: 'Meeting Request',
        description: 'Template for requesting parent-teacher meetings',
        category: 'meeting'
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Parent Communication</h1>
          <button
            onClick={() => {/* TODO: Show new message modal */}}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            New Message
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-2 px-4 ${
                activeTab === 'messages'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`py-2 px-4 ${
                activeTab === 'meetings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Meetings
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-4 ${
                activeTab === 'templates'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {mockData.messages.map(message => (
                <div
                  key={message.id}
                  className={`bg-white p-4 rounded-lg shadow ${
                    message.status === 'unread' ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.parent}</h3>
                      <p className="text-sm text-gray-600">{message.student} - {message.subject}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{message.message}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {/* TODO: Reply to message */}}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Reply
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

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              {mockData.meetings.map(meeting => (
                <div
                  key={meeting.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{meeting.parent}</h3>
                      <p className="text-sm text-gray-600">{meeting.student}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {/* TODO: Edit meeting */}}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {/* TODO: Cancel meeting */}}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.templates.map(template => (
                <div
                  key={template.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{template.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {/* TODO: Use template */}}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => {/* TODO: Edit template */}}
                      className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentCommunication; 