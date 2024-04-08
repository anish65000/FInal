import React from 'react';
import { Link } from 'react-router-dom';
import { useRider } from './RiderContext'; // Import useRider hook from RiderContext

const Navbar = () => {
  const { logout, state } = useRider(); // Access logout function from RiderContext

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    window.location.href = '/rider/login';
  };
  

  return (
    <nav className="bg-red shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white font-bold text-xl">Blood Bank</span>
          </div>
          {/* Navigation Links */}
          <div className="flex-1 flex justify-center sm:items-stretch sm:justify-end">
            <div className="flex space-x-4">
              {/* Notification Icon */}
              <a href="#" className="text-gray- hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Notifications
              </a>
              {/* Donation Request Icon */}
              <a href="/maplocation" className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm0 0V6m0 0L12 12m8 0l-4-4" />
                </svg>
                ride Requests
              </a>
              {/* Donor Location Icon */}
              <a href="/requestrides" className="text-gray-300 hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19s-8-4.5-8-11A8 8 0 0 1 12 5c4.42 0 8 3.58 8 8s-8 6-8 6zm0 0V9m0 0L9 12m3 3l3-3" />
                </svg>
                Donor Locations
              </a>
              {/* Profile Icon and Logout */}
              {state.isLoggedIn ? (
                <button onClick={handleLogout} className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-gray hover:bg-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
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
}

export default Navbar;
