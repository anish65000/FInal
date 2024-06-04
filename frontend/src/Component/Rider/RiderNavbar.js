import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRider } from './RiderContext';

const Navbar = () => {
  const { logout, state } = useRider();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.history.replaceState(null, '', '/');
    navigate('/');
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get('http://localhost:5000/rider-notifications', config);
      const responseData = response.data;
      console.log('responseData:', responseData); // Log responseData here
  
      let notificationsArray;
  
      // Check if responseData is a string
      if (typeof responseData === 'string') {
        // Try to parse concatenated JSON objects
        notificationsArray = responseData.split('}{').map((item, index, array) => {
          if (index === 0) {
            return JSON.parse(item + '}');
          } else if (index === array.length - 1) {
            return JSON.parse('{' + item);
          } else {
            return JSON.parse('{' + item + '}');
          }
        });
      } else if (Array.isArray(responseData)) {
        // If responseData is already an array, assume it's in the correct format
        notificationsArray = responseData;
      } else if (typeof responseData === 'object') {
        // If responseData is a single JSON object, put it into an array
        notificationsArray = [responseData];
      } else {
        console.error('Invalid format of responseData');
        return;
      }
  
      setNotifications(notificationsArray);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
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
              <div className="relative">
                <button 
                  onClick={fetchNotifications} 
                  className="text-gray- hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Notifications
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="list-reset">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <li key={index} className="hover:bg-blue px-4 py-2">
                            You have been requested blood from: {notification.recipient_name}, Destination: {notification.destination}
                          </li>
                        ))
                      ) : (
                        <li className="hover:bg-blue px-4 py-2">
                          No new notifications.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <a href="/riderprofile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm0 0V6m0 0L12 12m8 0l-4-4" />
                </svg>
                Rider profile
              </a>
              <a href="/requestrides" className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm0 0V6m0 0L12 12m8 0l-4-4" />
                </svg>
                Ride Requests
              </a>
              {state.isLoggedIn ? (
                <button onClick={handleLogout} className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link to="/" className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
