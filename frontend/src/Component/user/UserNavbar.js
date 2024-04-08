import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt, faSignOutAlt, faListAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Usercontext';

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { state: { isLoggedIn, userRole, username }, logout } = useUser();

  useEffect(() => {
    // Check user authentication status or load user data here
    // For example, fetch user data from an API or perform any asynchronous operation.
  }, []);

  const mytoggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/user/login');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Assuming the route for the profile page is '/profile'
  };

  return (
    <nav className="bg-red sticky top-0 z-50">
      <div className="container mx-auto p-7 flex items-center justify-between">
        <div className="flex items-center ml-auto space-x-4">
          <Link to="/" className="text-white mr-4 font-bold">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ml-2">Home</span>
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-20">
  {userRole && (
    <>
      {userRole.toLowerCase() === 'donor' && isLoggedIn && (
        <div className="relative cursor-pointer text-gray" onClick={mytoggleDropdown}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBookOpen} size="lg" />
            <span className="ml-2">Appointments</span>
          </div>
          {showDropdown && (
            <div className="absolute mt-2 p-2 bg-white text-gray-800 shadow-lg rounded">
              <Link to="/slots" className="block py-2">
                Available slots
              </Link>
              <Link to="/bloodappointment" className="block py-2">
                Book Appointment
              </Link>
              <Link to="/feedback" className="block py-2">
                Feedback
              </Link>
              <Link to="/getapppointment" className="block py-2">
                My Appointments
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )}



          {isLoggedIn && (
            <div className="relative cursor-pointer text-gray" onClick={mytoggleDropdown}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserAlt} size="lg" />
                <span className="ml-2">{username}</span>
              </div>
              {showDropdown && (
                <div className="absolute mt-2 p-2 bg-white text-gray-800 shadow-lg rounded">
                  {userRole && (
                    <>
                      {userRole.toLowerCase() === 'donor' && (
                        <>
                          <Link to="/viewprofile" className="block py-2">
                            Premium donor Profile
                          </Link>
                          <Link to="/donate" className="block py-2">
                            Blood Donation 
                          </Link>

                          <Link to="/register/prem" className="block py-2">
                            Register premium donor
                          </Link>
                        </>
                      )}
                      {userRole.toLowerCase() === 'recipient' && (
                        <>
                          <Link to="/checkcomp" className="block py-2">
                            Checkcomp
                          </Link>
                          <Link to="/bloodrequest" className="block py-2">
                            Blood Request History
                          </Link>
                          <Link to="/donors" className="block py-2">
                            Donor Request Blood
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <>
              {(userRole && userRole.toLowerCase() === 'donor') && (
                <Link to="/" className="text-white">
                  <FontAwesomeIcon icon={faListAlt} size="lg" />
                  <span className="ml-2">Blood Requests (Donors)</span>
                </Link>
              )}
              {(userRole && userRole.toLowerCase() === 'recipient') && (
                <Link to="/blood" className="text-white">
                  <FontAwesomeIcon icon={faListAlt} size="lg" />
                  <span className="ml-2">Blood Donations (Recipients)</span>
                </Link>
              )}
            </>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-gray">
              <button className="text-white" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-gray-500">
              <Settings className="h-6 w-6" />
              <span className="ml-2">Settings</span>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative cursor-pointer text-gray" onClick={handleProfileClick}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserAlt} size="lg" />
                <span className="ml-2">Profile</span>
              </div>
            </div>
          )}
        </div>
        </div>
      
    </nav>
  );
};

export default UserNavbar;
