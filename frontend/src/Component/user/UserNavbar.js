import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt, faSignOutAlt, faListAlt, faBookOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Usercontext';
import Notifications from './Notification';

const UserNavbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const navigate = useNavigate();
  const { state: { isLoggedIn, userRole, username }, logout } = useUser();

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowAppointmentsDropdown(false);
    setShowNotificationDropdown(false);
  };

  const toggleAppointmentsDropdown = () => {
    setShowAppointmentsDropdown(!showAppointmentsDropdown);
    setShowProfileDropdown(false);
    setShowNotificationDropdown(false);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowProfileDropdown(false);
    setShowAppointmentsDropdown(false);
  };

  const handleLogout = () => {
    logout();
    window.history.replaceState(null, '', '/');
    navigate('/user/login');
  };

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  return (
    <nav className="bg-nav-gray sticky top-0 z-50">
      <div className="container mx-auto p-7 flex items-center justify-between">
        <div className="flex items-center ml-auto space-x-4">
          <Link to="/" className="text-custom-green mr-4 font-bold">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ml-2 font-normal font-['Elephant']">Home</span>
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-20">
          {userRole && userRole.toLowerCase() === 'donor' && isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green" onClick={toggleAppointmentsDropdown}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBookOpen} size="lg" />
                <span className="ml-2 font-normal font-['Elephant']">Appointments</span>
              </div>
              {showAppointmentsDropdown && (
                <div className="absolute mt-2 p-2 text-custom-green shadow-lg rounded">
                  <Link to="/slots" className="block py-2 text-gray">Available slots</Link>
                  <Link to="/bloodappointment" className="block py-2 text-gray">Book Appointment</Link>
                  <Link to="/getapppointment" className="block py-2 text-gray">My Appointments</Link>
                  <Link to="/feedback" className="block py-2 text-gray">feedback</Link>
                  
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green" onClick={toggleProfileDropdown}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserAlt} size="lg" />
                <span className="ml-2">{username}</span>
              </div>
              {showProfileDropdown && (
                <div className="absolute mt-2 p-2 text-custom-green shadow-lg rounded">
                  {userRole && userRole.toLowerCase() === 'donor' && (
                    <>
                      <Link to="/viewprofile" className="block py- text-gray">Premium donor Profile</Link>
                      <Link to="/donate" className="block py-2 text-gray">Blood Donation</Link>
                      <Link to="/register/prem" className="block py-2 text-gray">Register premium donor</Link>
                    </>
                  )}
                  {userRole && userRole.toLowerCase() === 'recipient' && (
                    <>
                      <Link to="/checkcomp" className="block py-2 text-gray">Checkcomp</Link>
                      <Link to="/bloodrequest" className="block py-2 text-gray ">Blood Request History</Link>
                      <Link to="/donors" className="block py-2 text-gray">Donor Request Blood</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <>
              {userRole && userRole.toLowerCase() === 'donor' && (
                <Link to="/donate" className="text-custom-green">
                  <FontAwesomeIcon icon={faListAlt} size="lg" />
                  <span className="ml-2 font-normal font-['Elephant']">Blood Requests (Donors)</span>
                </Link>
              )}
              {userRole && userRole.toLowerCase() === 'recipient' && (
                <Link to="/blood" className="text-custom-green">
                  <FontAwesomeIcon icon={faListAlt} size="lg" />
                  <span className="ml-2 font-normal font-['Elephant']">Blood Donations (Recipients)</span>
                </Link>
              )}
            </>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green">
              <button className="text-custom-green" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                <span className="ml-2 font-normal font-['Elephant']">Logout</span>
              </button>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green">
              <Settings className="h-6 w-6" />
              <span className="ml-2 font-normal font-['Elephant']">Settings</span>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green" onClick={handleProfileClick}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserAlt} size="lg" />
                <span className="ml-2 font-normal font-['Elephant']">Profile</span>
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-custom-green" onClick={toggleNotificationDropdown}>
              <FontAwesomeIcon icon={faBell} size="lg" />
              {showNotificationDropdown && (
                <div className="absolute mt-2 p-2 bg-white text-custom-green shadow-lg rounded">
                  <Notifications />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
