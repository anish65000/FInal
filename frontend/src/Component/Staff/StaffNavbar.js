import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faUsers, faVial, faTint } from '@fortawesome/free-solid-svg-icons';
import { useStaff } from './StaffContext'; // Import your context
import { useNavigate } from 'react-router-dom';
const StaffNavbar = () => {
  const [showDonorManagementDropdown, setShowDonorManagementDropdown] = useState(false);
  const { logout } = useStaff(); // Retrieve logout function from context
  const navigate = useNavigate(); // Hook for navigation

  const toggleDonorManagementDropdown = () => {
    setShowDonorManagementDropdown(!showDonorManagementDropdown);
  };

  const handleLogout = () => {
    // Call logout function when logout is clicked
    logout();
    navigate('/staff/login');
  };

  return (
    <nav className="bg-red sticky top-0 z-50">
      <div className="container mx-auto p-7 flex items-center justify-between">
        {/* Staff Home Page Link */}
        <div className="flex items-center ml-auto space-x-4">
          <Link to="/staff-home" className="text-white mr-4 font-bold">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ml-2">Home</span>
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-20">
          {/* Blood Inventory Icon */}
          <div className="relative cursor-pointer text-gray">
            <Link to="/bloodstock" className="text-white">
              <FontAwesomeIcon icon={faTint} size="lg" />
              <span className="ml-2">Blood Inventory</span>
            </Link>
          </div>

          {/* Donor Management Icon */}
          <div className="relative cursor-pointer text-gray" onClick={toggleDonorManagementDropdown}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} size="lg" />
              <span className="ml-2">Donor Management</span>
            </div>
            {/* Donor Management Dropdown */}
            {showDonorManagementDropdown && (
              <div className="absolute mt-2 p-2 bg-white text-gray-800 shadow-lg rounded">
                <Link to="/Adddonor" className="block py-2">
                  ADD Donor
                </Link>
                <Link to="/view-donation-history" className="block py-2">
                  View Donation History
                </Link>
                <Link to="/donorstock" className="block py-2">
                  Manage Donor
                </Link>
              </div>
            )}
          </div>

          {/* Logout Icon */}
          <div className="relative cursor-pointer text-gray" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            <span className="ml-2">Logout</span>
          </div>

        
        </div>
      </div>
    </nav>
  );
};

export default StaffNavbar;
