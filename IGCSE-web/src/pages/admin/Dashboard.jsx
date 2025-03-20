import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Users Overview</h2>
          <p>Total users statistics will be displayed here</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p>Recent system activity will be shown here</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">System Status</h2>
          <p>System status and metrics will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 