import React, { useState } from 'react';

const NotificationCenter = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock data - replace with actual data
  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Practice Set Completed',
      message: 'John Doe completed Mathematics Practice Set 1',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: 'Jane Smith has missed 3 consecutive classes',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Resource Available',
      message: 'Physics Formula Sheet has been updated',
      time: '2 hours ago',
      read: true
    }
  ];

  const notificationData = notifications || mockNotifications;
  const unreadCount = notificationData.filter(n => !n.read).length;

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800';
      case 'error':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-blue-50 text-blue-800';
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => {/* TODO: Mark all as read */}}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationData.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notificationData.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      getNotificationColor(notification.type)
                    }`} />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t">
            <button
              onClick={() => {/* TODO: View all notifications */}}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 