import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassOverview = ({ classes }) => {
  const navigate = useNavigate();

  // Mock data - replace with actual data
  const mockClasses = [
    {
      id: 1,
      name: 'IGCSE Mathematics A',
      students: 25,
      averageScore: 78,
      nextExam: '2024-04-15',
      recentActivity: 'New practice set assigned'
    },
    {
      id: 2,
      name: 'IGCSE Physics',
      students: 20,
      averageScore: 82,
      nextExam: '2024-04-20',
      recentActivity: 'Class test completed'
    }
  ];

  const data = classes.length > 0 ? classes : mockClasses;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Classes</h2>
        <button
          onClick={() => navigate('/teacher/classes')}
          className="text-blue-600 hover:text-blue-800"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(classItem => (
          <div
            key={classItem.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{classItem.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Students: {classItem.students}</p>
              <p>Average Score: {classItem.averageScore}%</p>
              <p>Next Exam: {new Date(classItem.nextExam).toLocaleDateString()}</p>
              <p className="text-blue-600">{classItem.recentActivity}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/teacher/classes/${classItem.id}`)}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/teacher/classes/${classItem.id}/progress`)}
                className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
              >
                Progress
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Total Students</h4>
          <p className="text-2xl font-bold text-blue-600">
            {data.reduce((acc, curr) => acc + curr.students, 0)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Average Score</h4>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(
              data.reduce((acc, curr) => acc + curr.averageScore, 0) / data.length
            )}%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Active Classes</h4>
          <p className="text-2xl font-bold text-purple-600">{data.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassOverview; 