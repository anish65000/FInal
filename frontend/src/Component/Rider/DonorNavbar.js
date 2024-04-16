import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRider } from './RiderContext';

const DonorNavbar = () => {
  const { logout, state } = useRider();
  const [notifications, setNotifications] = useState([]);
  const [ws, setWs] = useState(null);
  const riderName = localStorage.getItem('riderName');

  useEffect(() => {
    // Fetch notifications on component mount
    fetchNotifications();

    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8081'); // Change URL if needed
    setWs(socket);

    // Close WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rider-notifications?riderId=${state.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle WebSocket messages
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new-request') {
        // Update notifications with new request
        setNotifications((prevNotifications) => [...prevNotifications, data.data]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  const handleLogout = () => {
    logout();
    window.location.href = '/rider/login';
  };

  return (
    <nav className="bg-red shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white font-bold text-xl">Blood Bank</span>
          </div>
          <div className="flex-1 flex justify-center sm:items-stretch sm:justify-end">
            <div className="flex space-x-4">
              {/* Notification Button */}
              <div className="relative">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Notifications
                  {notifications.length > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold ml-2">
                      {notifications.length}
                    </span>
                  )}
                </a>
                {/* Notification List */}
                {notifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md">
                    <ul className="py-2">
                      {notifications.map((notification, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          {notification.destination}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Donor Location Icon */}
              <a href="/requestrides" className="text-gray-300 hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19s-8-4.5-8-11A8 8 0 0 1 12 5c4.42 0 8 3.58 8 8s-8 6-8 6zm0 0V9m0 0L9 12m3 3l3-3" />
                </svg>
                request ride
              </a>
              <a href="/riderprofile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm0 0V6m0 0L12 12m8 0l-4-4" />
                </svg>
                Rider profile
              </a>
              {/* Profile Icon */}
              {state.isLoggedIn && (
                <div className="flex items-center">
                  
                  <span className="text-gray-300 ml-2">{riderName}</span>
                </div>
              )}
              {/* Logout or Login Button */}
              {state.isLoggedIn ? (
                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DonorNavbar;
