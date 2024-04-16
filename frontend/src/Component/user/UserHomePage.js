import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './Usercontext';
import UserNavbar from './UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faFlask, faUserCircle, faDroplet } from '@fortawesome/free-solid-svg-icons';
import RecipentsSidebar from './Recipients/UserSidebar';
import DonorSidebar from './Donor/Donorsidebar';

const UserHome = () => {
  const { state } = useUser();
  const { isLoggedIn, userData } = state;
  const userRole = userData ? userData.userRole : null;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // Fetch notifications logic...
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="">
        <div className="row">
          <div className="col-md-2 p-0">
            {userRole === 'Recipient' ? <RecipentsSidebar /> : <DonorSidebar />}
          </div>
          <div className="col-md-10">
            {isLoggedIn && (
              <div className="alert alert-success" role="alert">
                <h1 className="text-center mb-0">Welcome, {userRole || 'User'}</h1>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faUserCircle} size="5x" className="mb-3" />
                    <h2 className="card-title">Hello, {}</h2>
                    <p className="card-text">Explore your user dashboard and manage your profile.</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faDroplet} size="5x" className="mb-3" />
                    <h2 className="card-title">Donor Dashboard</h2>
                    <p className="card-text">Check your availability and manage blood requests.</p>
                    <Link to="/donors" className="btn btn-primary">
                      Go to Donor Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4">Find a Blood Bank</h2>
                    <p className="card-text text-center text-muted mb-4">
                      Search for blood banks in your area to find the nearest location to donate blood or pick up blood requests.
                    </p>
                    <div className="text-center">
                      <Link to="/bloodbank" className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faFlask} className="me-2" /> Find a Blood Bank
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-4">Notifications</h2>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className="alert alert-info" role="alert">
                          {notification.userName && (
                            <p>
                              <strong>New blood request from:</strong> you have urgent message {notification.message} from the {notification.userName}
                            </p>
                          )}
                          {!notification.userName && <p>{notification.message}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted">No new notifications.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;