import React, { useState } from 'react';

const Results = () => {
  // Placeholder data - would typically come from an API
  const [examResults] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      examDate: '2024-03-15',
      score: 85,
      totalQuestions: 50,
      correctAnswers: 42,
      timeSpent: '1h 45m',
      topics: [
        { name: 'Algebra', score: 90 },
        { name: 'Geometry', score: 85 },
        { name: 'Statistics', score: 80 }
      ]
    },
    {
      id: 2,
      subject: 'Physics',
      examDate: '2024-03-10',
      score: 78,
      totalQuestions: 40,
      correctAnswers: 31,
      timeSpent: '1h 30m',
      topics: [
        { name: 'Mechanics', score: 85 },
        { name: 'Electricity', score: 75 },
        { name: 'Waves', score: 74 }
      ]
    }
  ]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Exam Results</h1>
        <p className="mt-2 text-gray-600">View and analyze your performance</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(examResults.reduce((acc, exam) => acc + exam.score, 0) / examResults.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Exams</h3>
          <p className="text-3xl font-bold text-green-600">{examResults.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Best Subject</h3>
          <p className="text-3xl font-bold text-purple-600">
            {examResults.reduce((best, exam) => exam.score > best.score ? exam : best).subject}
          </p>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        {examResults.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{exam.subject}</h2>
                <span className={`text-2xl font-bold ${getScoreColor(exam.score)}`}>
                  {exam.score}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Taken on {new Date(exam.examDate).toLocaleDateString()}</p>
            </div>

            <div className="p-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Questions</p>
                  <p className="text-lg font-semibold">
                    {exam.correctAnswers} / {exam.totalQuestions}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-lg font-semibold">
                    {((exam.correctAnswers / exam.totalQuestions) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Time Spent</p>
                  <p className="text-lg font-semibold">{exam.timeSpent}</p>
                </div>
              </div>

              {/* Topic Breakdown */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Topic Breakdown</h3>
                <div className="space-y-2">
                  {exam.topics.map((topic, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-32 text-sm text-gray-600">{topic.name}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${topic.score}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(topic.score)}`}>
                        {topic.score}%
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

export default Results; 