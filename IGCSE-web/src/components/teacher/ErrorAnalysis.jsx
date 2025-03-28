import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorAnalysis = ({ data }) => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - replace with actual data
  const mockData = {
    subjects: [
      {
        id: 1,
        name: 'Mathematics',
        errorRate: 15,
        commonErrors: [
          { type: 'Calculation', count: 45, percentage: 30 },
          { type: 'Formula Application', count: 30, percentage: 20 },
          { type: 'Concept Understanding', count: 75, percentage: 50 }
        ],
        improvement: '+5%'
      },
      {
        id: 2,
        name: 'Physics',
        errorRate: 12,
        commonErrors: [
          { type: 'Formula Substitution', count: 30, percentage: 40 },
          { type: 'Unit Conversion', count: 25, percentage: 33 },
          { type: 'Concept Application', count: 20, percentage: 27 }
        ],
        improvement: '+3%'
      }
    ],
    students: [
      {
        id: 1,
        name: 'John Doe',
        subject: 'Mathematics',
        errorRate: 18,
        commonErrors: ['Calculation', 'Formula Application'],
        improvement: '-2%'
      },
      {
        id: 2,
        name: 'Jane Smith',
        subject: 'Physics',
        errorRate: 10,
        commonErrors: ['Unit Conversion'],
        improvement: '+5%'
      }
    ],
    trends: {
      week: [20, 18, 15, 15],
      month: [25, 22, 20, 18, 15],
      year: [30, 28, 25, 22, 20, 18, 15]
    },
    stats: {
      totalErrors: 285,
      averageErrorRate: 13.5,
      improvementRate: 4.2,
      studentsAtRisk: 5
    }
  };

  const errorData = data || mockData;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Error Analysis</h2>
        <button
          onClick={() => navigate('/teacher/analytics/errors')}
          className="text-blue-600 hover:text-blue-800"
        >
          View Detailed Analysis
        </button>
      </div>

      {/* Error Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800">Total Errors</h4>
          <p className="text-2xl font-bold text-red-600">{errorData.stats.totalErrors}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800">Average Error Rate</h4>
          <p className="text-2xl font-bold text-yellow-600">{errorData.stats.averageErrorRate}%</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Improvement Rate</h4>
          <p className="text-2xl font-bold text-green-600">{errorData.stats.improvementRate}%</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-800">Students at Risk</h4>
          <p className="text-2xl font-bold text-orange-600">{errorData.stats.studentsAtRisk}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">All Subjects</option>
            {errorData.subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Error Trends Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Error Rate Trends</h3>
        <div className="h-48">
          <div className="flex items-end justify-between h-full">
            {errorData.trends[timeRange].map((value, index) => (
              <div
                key={index}
                className="w-8 bg-red-100 rounded-t"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subject Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Subject Analysis</h3>
        <div className="space-y-4">
          {errorData.subjects.map(subject => (
            <div
              key={subject.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">{subject.name}</h4>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Error Rate: {subject.errorRate}%
                  </p>
                  <p className={`text-sm ${
                    subject.improvement.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {subject.improvement} improvement
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {subject.commonErrors.map((error, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2/3">
                      <p className="text-sm font-medium">{error.type}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${error.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-1/3 text-right">
                      <p className="text-sm text-gray-600">{error.count} errors</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Analysis */}
      <div>
        <h3 className="text-lg font-medium mb-4">Student Analysis</h3>
        <div className="space-y-4">
          {errorData.students.map(student => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h4 className="font-medium">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.subject}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{student.errorRate}%</p>
                  <p className="text-sm text-gray-600">Error Rate</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    student.improvement.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {student.improvement}
                  </p>
                  <p className="text-sm text-gray-600">Improvement</p>
                </div>
                <button
                  onClick={() => navigate(`/teacher/students/${student.id}/errors`)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/teacher/analytics/errors/report')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Error Report
        </button>
        <button
          onClick={() => navigate('/teacher/analytics/errors/action-plan')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Action Plan
        </button>
      </div>
    </div>
  );
};

export default ErrorAnalysis; 