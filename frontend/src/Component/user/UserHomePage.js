import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './Usercontext';
import UserNavbar from './UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faFlask } from '@fortawesome/free-solid-svg-icons';
import RecipentsSidebar from './Recipients/UserSidebar';
import DonorSidebar from './Donor/Donorsidebar';

const UserHome = () => {
  const { state } = useUser();
  const { isLoggedIn, userData } = state;
  const userRole = userData ? userData.userRole : null;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const notificationsResponse = await fetch('http://localhost:5000/donor-notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!notificationsResponse.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await notificationsResponse.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    const ws = new WebSocket('ws://localhost:8081');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
    
      if (data.type === 'new-request' && !notifications.some(notification => notification.id === data.data.id)) {
        setNotifications(prevNotifications => [...prevNotifications, data.data]);
      }
    };
    
    return () => {
     // ws.close(); // Close WebSocket connection on component unmount
    };
  }, []);

  return (
    <>
      <UserNavbar />
  
      <div className="row">
        <div className="col-md-2 p-0">
          {userRole === 'Recipient' ? <RecipentsSidebar /> : <DonorSidebar />}
        </div>
        <div className="col-md-9">
          {isLoggedIn && (
            <div className="alert alert-success" role="alert">
              <h1 className="text-center mb-0">Welcome, {userRole || 'User'}</h1>
            </div>
          )}

          {/* Rest of your content */}
          {userRole === 'Donor' && (
            <>
              <section className="mt-4">
                <h2 className="text-center mb-4">Donor Information</h2>
                <p className="text-center text-muted mb-4">
                  Check your availability and manage blood requests.
                </p>
                <Link to="/donor-dashboard" className="btn btn-primary">
                  <FontAwesomeIcon icon={faHospital} className="me-2" /> Donor Dashboard
                </Link>
              </section>
            </>
          )}

          {userRole !== 'Donor' && (
            <>
              <section className="mt-4">
                <h2 className="text-center mb-4">How Blood Donation Works</h2>
                <p className="text-center text-muted mb-4">
                  Click "Become a Donor" to learn more about the eligibility criteria and donation process.
                </p>
                <Link to="/become-donor" className="btn btn-primary">
                  <FontAwesomeIcon icon={faHospital} className="me-2" /> Become a Donor
                </Link>
              </section>

              <section className="mt-4">
                <h2 className="text-center mb-4">Find a Blood Bank</h2>
                <p className="text-center text-muted mb-4">
                  Search for blood banks in your area to find the nearest location to donate blood or pick up blood requests.
                </p>
                <Link to="/blood-banks" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faFlask} className="me-2" /> Find a Blood Bank
                </Link>
              </section>
            </>
          )}

          {/* Display notifications */}
          <div className="mt-5">
            <h2 className="text-center mb-4">Notifications</h2>
            {notifications.map((notification, index) => (
              <div key={index} className="alert alert-info" role="alert">
                <p><strong>New blood request from:</strong> {notification.userName}</p>
                <p><strong>Message:</strong> {notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
