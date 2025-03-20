import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentProgress = () => {
  const { studentId } = useParams();
  
  // Placeholder data - would typically come from an API
  const [student] = useState({
    id: studentId || 1,
    name: 'John Doe',
    grade: '10th',
    overallProgress: 78,
    subjects: [
      {
        name: 'Mathematics',
        progress: 85,
        recentScores: [92, 78, 85, 88],
        topics: [
          { name: 'Algebra', mastery: 90, status: 'Excellent' },
          { name: 'Geometry', mastery: 85, status: 'Good' },
          { name: 'Statistics', mastery: 75, status: 'Improving' }
        ]
      },
      {
        name: 'Physics',
        progress: 72,
        recentScores: [75, 68, 72, 73],
        topics: [
          { name: 'Mechanics', mastery: 80, status: 'Good' },
          { name: 'Electricity', mastery: 65, status: 'Needs Work' },
          { name: 'Waves', mastery: 70, status: 'Improving' }
        ]
      }
    ],
    attendance: {
      present: 45,
      absent: 3,
      late: 2,
      total: 50
    },
    upcomingExams: [
      {
        subject: 'Mathematics',
        topic: 'Calculus Basics',
        date: '2024-03-25'
      },
      {
        subject: 'Physics',
        topic: 'Electromagnetic Waves',
        date: '2024-03-28'
      }
    ]
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 65) return 'bg-blue-600';
    if (progress >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getMasteryBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'improving': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6">
      {/* Student Overview */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{student.name}'s Progress</h1>
        <p className="mt-2 text-gray-600">Grade {student.grade}</p>
      </div>

      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall Progress</h3>
          <div className="flex items-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="35"
                  cx="40"
                  cy="40"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="5"
                  strokeDasharray={220}
                  strokeDashoffset={220 - (220 * student.overallProgress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="35"
                  cx="40"
                  cy="40"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-xl font-bold">{student.overallProgress}%</p>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Academic Year Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Attendance</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Present</span>
              <span className="font-medium">{student.attendance.present} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Absent</span>
              <span className="font-medium text-red-600">{student.attendance.absent} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Late</span>
              <span className="font-medium text-yellow-600">{student.attendance.late} days</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{
                  width: `${(student.attendance.present / student.attendance.total) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Exams</h3>
          <div className="space-y-3">
            {student.upcomingExams.map((exam, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-3">
                <p className="font-medium">{exam.subject}</p>
                <p className="text-sm text-gray-600">{exam.topic}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exam.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="space-y-6">
        {student.subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">{subject.name}</h2>
            </div>
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm font-medium">{subject.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(subject.progress)}`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              {/* Recent Scores */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Test Scores</h3>
                <div className="flex items-end space-x-2 h-32">
                  {subject.recentScores.map((score, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full ${getProgressColor(score)}`}
                        style={{ height: `${score}%` }}
                      />
                      <span className="text-sm mt-2">{score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Topic Mastery</h3>
                <div className="space-y-4">
                  {subject.topics.map((topic, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{topic.name}</p>
                        <div className="h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(topic.mastery)}`}
                            style={{ width: `${topic.mastery}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`ml-4 px-2 py-1 text-xs font-medium rounded-full ${getMasteryBadgeColor(
                          topic.status
                        )}`}
                      >
                        {topic.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProgress; 