import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Placeholder data - would typically come from an API
  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      grade: '10th',
      subjects: ['Mathematics', 'Physics', 'Chemistry'],
      recentExams: [
        { subject: 'Mathematics', score: 85, date: '2024-03-15' },
        { subject: 'Physics', score: 78, date: '2024-03-14' },
      ],
    },
    // Add more students as needed
  ]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor your children's academic progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{students.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Performance</h3>
          <p className="text-3xl font-bold text-green-600">81%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Exams</h3>
          <p className="text-3xl font-bold text-purple-600">3</p>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Your Students</h2>
        </div>
        <div className="divide-y">
          {students.map((student) => (
            <div key={student.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-gray-600">Grade: {student.grade}</p>
                </div>
                <Link
                  to={`/parent/student-progress/${student.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Progress
                </Link>
              </div>

              {/* Recent Exams */}
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Recent Exam Results</h4>
                <div className="space-y-2">
                  {student.recentExams.map((exam, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded"
                    >
                      <div>
                        <p className="font-medium">{exam.subject}</p>
                        <p className="text-sm text-gray-500">{exam.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">{exam.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Enrolled Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {student.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 