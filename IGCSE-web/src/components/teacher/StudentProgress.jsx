import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProgress = ({ data }) => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - replace with actual data
  const mockData = {
    students: [
      {
        id: 1,
        name: 'John Doe',
        class: 'IGCSE Mathematics A',
        score: 85,
        improvement: '+5%',
        attendance: 95,
        lastActivity: '2024-03-26'
      },
      {
        id: 2,
        name: 'Jane Smith',
        class: 'IGCSE Mathematics A',
        score: 92,
        improvement: '+2%',
        attendance: 100,
        lastActivity: '2024-03-26'
      }
    ],
    trends: {
      week: [65, 70, 75, 80, 85],
      month: [60, 65, 70, 75, 80, 85],
      year: [55, 60, 65, 70, 75, 80, 85]
    }
  };

  const progressData = data || mockData;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student Progress</h2>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="h-48 mb-6">
        <div className="flex items-end justify-between h-full">
          {progressData.trends[timeRange].map((value, index) => (
            <div
              key={index}
              className="w-8 bg-blue-100 rounded-t"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-4">
        {progressData.students.map(student => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.class}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{student.score}%</p>
                <p className={`text-sm ${
                  student.improvement.startsWith('+')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {student.improvement}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{student.attendance}%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
              <button
                onClick={() => navigate(`/teacher/students/${student.id}`)}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/teacher/analytics')}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
        >
          View Detailed Analytics
        </button>
        <button
          onClick={() => navigate('/teacher/parent-communication')}
          className="px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
        >
          Send Progress Reports
        </button>
      </div>
    </div>
  );
};

export default StudentProgress; 