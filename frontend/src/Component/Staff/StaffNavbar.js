import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faUsers, faVial, faTint } from '@fortawesome/free-solid-svg-icons';
import { useStaff } from './StaffContext'; // Import your context
import { useNavigate } from 'react-router-dom';

const StaffNavbar = () => {
  const [showDonorManagementDropdown, setShowDonorManagementDropdown] = useState(false);
  const [showRecipientManagementDropdown, setShowRecipientManagementDropdown] = useState(false);
  const { logout, isLoggedIn } = useStaff(); // Retrieve logout function from context
  const navigate = useNavigate(); // Hook for navigation

  const toggleDonorManagementDropdown = () => {
    setShowDonorManagementDropdown(!showDonorManagementDropdown);
    setShowRecipientManagementDropdown(false); // Close other dropdown if open
  };

  const toggleRecipientManagementDropdown = () => {
    setShowRecipientManagementDropdown(!showRecipientManagementDropdown);
    setShowDonorManagementDropdown(false); // Close other dropdown if open
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    // Clear the history stack by replacing the current entry and pushing a new state
    window.history.replaceState(null, '', '/'); // Replace the current entry with the homepage
    navigate('/staff/login'); // Navigate to the login page
  };

  const handleProfileClick = () => {
    navigate('/stfprofile'); // Assuming the route for the profile page is '/profile'
  };

  return (
    <nav className="bg-nav-gray sticky top-0 z-50">
      <div className="container mx-auto p-7 flex items-center justify-between">
        {/* Staff Home Page Link */}
        <div className="flex items-center ml-auto space-x-4">
          <Link to="/" className="text-custom-green mr-4 font-bold">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ml-2 font-normal font-['Elephant']">Home</span>
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-20">
          {/* Blood Inventory Icon */}
          <div className="relative cursor-pointer text-custom-green ">
            <Link to="/bloodstock" className="text-custom-green">
              <FontAwesomeIcon icon={faTint} size="lg" />
              <span className="ml-2 font-normal font-['Elephant']">Blood Inventory</span>
            </Link>
          </div>

          {/* Donor Management Icon */}
          <div className="relative cursor-pointer text-custom-green " onClick={toggleDonorManagementDropdown}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} size="lg" />
              <span className="ml-2 font-normal font-['Elephant']">Donor Management</span>
            </div>
            {/* Donor Management Dropdown */}
            {showDonorManagementDropdown && (
              <div className="absolute mt-2 p-2 text-custom-green shadow-lg rounded">
                <Link to="/Adddonor" className="block py-2 text-custom-green ">
                  ADD Donor
                </Link>
              
                <Link to="/donorstock" className="block py-2 text-custom-green ">
                  Manage Donor
                </Link>
              </div>
            )}
          </div>
          {/* Recipient Management Icon */}
          <div className="relative cursor-pointer text-custom-green " onClick={toggleRecipientManagementDropdown}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} size="lg" />
              <span className="ml-2 font-normal font-['Elephant']">Recipient Management</span>
            </div>
            {/* Recipient Management Dropdown */}
            {showRecipientManagementDropdown && (
              <div className="absolute mt-2 p-2 text-custom-green shadow-lg rounded">
                <Link to="/AddRecipients" className="block py-2 text-custom-green ">
                  Add Recipient
                </Link>
                <Link to="/RecipientsComponent" className="block py-2 text-custom-green ">
                  Manage Recipient
                </Link>
              </div>
            )}
          </div>
          {/* Logout Icon */}
          <div className="relative cursor-pointer text-custom-green " onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            <span className="ml-2 font-normal font-['Elephant']">Logout</span>
          </div>
          {/* Profile Icon */}
          <div className="relative cursor-pointer text-custom-green " onClick={handleProfileClick}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <span className="ml-2 font-normal font-['Elephant']">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default StaffNavbar;
