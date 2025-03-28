import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data - replace with actual data
  const mockData = {
    classes: [
      {
        id: 1,
        name: 'IGCSE Mathematics A',
        averageScore: 78,
        improvement: '+5%',
        attendance: 95,
        students: 25
      },
      {
        id: 2,
        name: 'IGCSE Physics',
        averageScore: 82,
        improvement: '+3%',
        attendance: 92,
        students: 20
      }
    ],
    performanceTrends: {
      week: [65, 70, 75, 80, 85],
      month: [60, 65, 70, 75, 80, 85],
      year: [55, 60, 65, 70, 75, 80, 85]
    },
    subjectPerformance: [
      {
        subject: 'Mathematics',
        averageScore: 78,
        improvement: '+5%',
        students: 25
      },
      {
        subject: 'Physics',
        averageScore: 82,
        improvement: '+3%',
        students: 20
      },
      {
        subject: 'Chemistry',
        averageScore: 75,
        improvement: '+2%',
        students: 15
      }
    ],
    topStudents: [
      {
        id: 1,
        name: 'John Doe',
        class: 'IGCSE Mathematics A',
        score: 92,
        improvement: '+8%'
      },
      {
        id: 2,
        name: 'Jane Smith',
        class: 'IGCSE Physics',
        score: 88,
        improvement: '+5%'
      }
    ],
    strugglingStudents: [
      {
        id: 3,
        name: 'Mike Johnson',
        class: 'IGCSE Mathematics A',
        score: 65,
        improvement: '-2%'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        class: 'IGCSE Physics',
        score: 68,
        improvement: '-1%'
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">All Classes</option>
              {mockData.classes.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800">Average Score</h4>
            <p className="text-2xl font-bold text-blue-600">78%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800">Improvement Rate</h4>
            <p className="text-2xl font-bold text-green-600">+5%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800">Average Attendance</h4>
            <p className="text-2xl font-bold text-purple-600">94%</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800">Total Students</h4>
            <p className="text-2xl font-bold text-yellow-600">60</p>
          </div>
        </div>

        {/* Performance Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
          <div className="h-64">
            <div className="flex items-end justify-between h-full">
              {mockData.performanceTrends[timeRange].map((value, index) => (
                <div
                  key={index}
                  className="w-8 bg-blue-100 rounded-t"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
            <div className="space-y-4">
              {mockData.subjectPerformance.map(subject => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{subject.subject}</p>
                    <p className="text-sm text-gray-600">{subject.students} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{subject.averageScore}%</p>
                    <p className={`text-sm ${
                      subject.improvement.startsWith('+')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {subject.improvement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top Performing Students</h2>
            <div className="space-y-4">
              {mockData.topStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{student.score}%</p>
                    <p className="text-sm text-green-600">{student.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Struggling Students */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Students Needing Support</h2>
          <div className="space-y-4">
            {mockData.strugglingStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{student.score}%</p>
                  <p className="text-sm text-red-600">{student.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 