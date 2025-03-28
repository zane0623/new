import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceSummary = ({ data }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  // Mock data - replace with actual data
  const mockData = {
    resources: [
      {
        id: 1,
        title: 'IGCSE Mathematics Practice Set 1',
        type: 'practice',
        subject: 'Mathematics',
        students: 25,
        lastUpdated: '2024-03-26',
        status: 'active'
      },
      {
        id: 2,
        title: 'Physics Formula Sheet',
        type: 'reference',
        subject: 'Physics',
        students: 20,
        lastUpdated: '2024-03-25',
        status: 'active'
      },
      {
        id: 3,
        title: 'Chemistry Lab Report Template',
        type: 'template',
        subject: 'Chemistry',
        students: 15,
        lastUpdated: '2024-03-24',
        status: 'draft'
      }
    ],
    stats: {
      total: 12,
      active: 8,
      drafts: 4,
      bySubject: {
        Mathematics: 5,
        Physics: 4,
        Chemistry: 3
      }
    }
  };

  const resourceData = data || mockData;

  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'practice', label: 'Practice Sets' },
    { id: 'reference', label: 'Reference Materials' },
    { id: 'template', label: 'Templates' }
  ];

  const filteredResources = filter === 'all'
    ? resourceData.resources
    : resourceData.resources.filter(resource => resource.type === filter);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resource Library</h2>
        <button
          onClick={() => navigate('/teacher/resources')}
          className="text-blue-600 hover:text-blue-800"
        >
          View All
        </button>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Total Resources</h4>
          <p className="text-2xl font-bold text-blue-600">{resourceData.stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Active Resources</h4>
          <p className="text-2xl font-bold text-green-600">{resourceData.stats.active}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800">Draft Resources</h4>
          <p className="text-2xl font-bold text-yellow-600">{resourceData.stats.drafts}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {filters.map(filterItem => (
          <button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === filterItem.id
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filterItem.label}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-gray-600">
                {resource.subject} • {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{resource.students}</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Date(resource.lastUpdated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Last Updated</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/teacher/resources/${resource.id}`)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/teacher/resources/${resource.id}/share`)}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/teacher/resources/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Resource
        </button>
        <button
          onClick={() => navigate('/teacher/resources/import')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Import Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceSummary; 