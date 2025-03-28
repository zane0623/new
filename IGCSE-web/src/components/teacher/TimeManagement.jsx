import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeManagement = ({ data }) => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data - replace with actual data
  const mockData = {
    classes: [
      {
        id: 1,
        name: 'IGCSE Mathematics A',
        schedule: [
          { day: 'Monday', time: '09:00-10:30', type: 'lecture' },
          { day: 'Wednesday', time: '09:00-10:30', type: 'practice' },
          { day: 'Friday', time: '09:00-10:30', type: 'review' }
        ],
        totalHours: 4.5,
        completedHours: 3.5
      },
      {
        id: 2,
        name: 'IGCSE Physics',
        schedule: [
          { day: 'Tuesday', time: '11:00-12:30', type: 'lecture' },
          { day: 'Thursday', time: '11:00-12:30', type: 'practice' }
        ],
        totalHours: 3,
        completedHours: 2
      }
    ],
    upcomingSessions: [
      {
        id: 1,
        class: 'IGCSE Mathematics A',
        type: 'lecture',
        date: '2024-03-27',
        time: '09:00-10:30',
        topic: 'Algebraic Expressions'
      },
      {
        id: 2,
        class: 'IGCSE Physics',
        type: 'practice',
        date: '2024-03-28',
        time: '11:00-12:30',
        topic: 'Forces and Motion'
      }
    ],
    timeStats: {
      totalScheduled: 7.5,
      totalCompleted: 5.5,
      averageAttendance: 92,
      upcomingSessions: 5
    }
  };

  const timeData = data || mockData;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Time Management</h2>
        <button
          onClick={() => navigate('/teacher/schedule')}
          className="text-blue-600 hover:text-blue-800"
        >
          Manage Schedule
        </button>
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Total Hours Scheduled</h4>
          <p className="text-2xl font-bold text-blue-600">{timeData.timeStats.totalScheduled}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Hours Completed</h4>
          <p className="text-2xl font-bold text-green-600">{timeData.timeStats.totalCompleted}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Average Attendance</h4>
          <p className="text-2xl font-bold text-purple-600">{timeData.timeStats.averageAttendance}%</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800">Upcoming Sessions</h4>
          <p className="text-2xl font-bold text-yellow-600">{timeData.timeStats.upcomingSessions}</p>
        </div>
      </div>

      {/* Class Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-lg"
        >
          <option value="all">All Classes</option>
          {timeData.classes.map(classItem => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
        <div className="space-y-4">
          {timeData.upcomingSessions.map(session => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h4 className="font-medium">{session.class}</h4>
                <p className="text-sm text-gray-600">{session.topic}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Date(session.date).toLocaleDateString()} • {session.time}
                </p>
                <p className="text-sm text-gray-600 capitalize">{session.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Schedules */}
      <div>
        <h3 className="text-lg font-medium mb-4">Class Schedules</h3>
        <div className="space-y-4">
          {timeData.classes.map(classItem => (
            <div
              key={classItem.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">{classItem.name}</h4>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {classItem.completedHours}/{classItem.totalHours} hours completed
                  </p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${(classItem.completedHours / classItem.totalHours) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classItem.schedule.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg"
                  >
                    <p className="font-medium">{slot.day}</p>
                    <p className="text-sm text-gray-600">{slot.time}</p>
                    <p className="text-sm text-blue-600 capitalize">{slot.type}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/teacher/schedule/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Session
        </button>
        <button
          onClick={() => navigate('/teacher/schedule/import')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Import Schedule
        </button>
      </div>
    </div>
  );
};

export default TimeManagement; 