import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PracticeSets = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data
  const mockPracticeSets = [
    {
      id: 1,
      title: 'IGCSE Mathematics Practice Set 1',
      subject: 'Mathematics',
      topic: 'Algebra',
      questions: 20,
      duration: '60 minutes',
      difficulty: 'Medium',
      students: 25,
      lastUpdated: '2024-03-26',
      status: 'active'
    },
    {
      id: 2,
      title: 'Physics Mechanics Practice',
      subject: 'Physics',
      topic: 'Forces and Motion',
      questions: 15,
      duration: '45 minutes',
      difficulty: 'Hard',
      students: 20,
      lastUpdated: '2024-03-25',
      status: 'active'
    },
    {
      id: 3,
      title: 'Chemistry Equations Practice',
      subject: 'Chemistry',
      topic: 'Chemical Equations',
      questions: 25,
      duration: '75 minutes',
      difficulty: 'Easy',
      students: 15,
      lastUpdated: '2024-03-24',
      status: 'draft'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Practice Sets' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Drafts' },
    { id: 'archived', label: 'Archived' }
  ];

  const filteredSets = mockPracticeSets.filter(set => {
    const matchesTab = activeTab === 'all' || set.status === activeTab;
    const matchesSearch = set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         set.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         set.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Practice Sets</h1>
          <button
            onClick={() => {/* TODO: Show create practice set modal */}}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Practice Set
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search practice sets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveTab(filter.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === filter.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSets.map(set => (
            <div
              key={set.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{set.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  set.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {set.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Subject: {set.subject}</p>
                <p>Topic: {set.topic}</p>
                <p>Questions: {set.questions}</p>
                <p>Duration: {set.duration}</p>
                <p>Students: {set.students}</p>
                <p>Last Updated: {new Date(set.lastUpdated).toLocaleDateString()}</p>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(set.difficulty)}`}>
                  {set.difficulty}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {/* TODO: Edit practice set */}}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {/* TODO: Preview practice set */}}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                >
                  Preview
                </button>
                <button
                  onClick={() => {/* TODO: Assign to class */}}
                  className="px-3 py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No practice sets found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PracticeSets; 