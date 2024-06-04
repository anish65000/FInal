import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './Usercontext';
import UserNavbar from './UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faFlask, faUserCircle, faDroplet } from '@fortawesome/free-solid-svg-icons';
import RecipentsSidebar from './Recipients/UserSidebar';
import DonorSidebar from './Donor/Donorsidebar';
import slogan1 from '../../Assest/img/slogan1.png';
import slogan2 from '../../Assest/img/slogan2.png';

const UserHome = () => {
  const { state } = useUser();
  const { isLoggedIn, userData } = state;
  const userRole = userData ? userData.userRole : null;
  const [notifications, setNotifications] = useState([]);
  return (
    <>
      <UserNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            {userRole === 'Recipient' ? <RecipentsSidebar /> : <DonorSidebar />}
          </div>
          <div className="col-md-10">
            <div className="container-fluid mt-4">
              {isLoggedIn && (
                <div className="alert alert-success" role="alert">
                  <h1 className="text-center mb-0" style={{ color: '#27ae60' }}>Welcome, {userRole || 'User'}</h1>
                </div>
              )}

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h2 className="card-title text-center mb-4" style={{ color: '#2980b9' }}>About Donation</h2>
                      <p className="card-text">
                        Blood donation is a simple and safe way to help save lives. By donating blood, you can provide essential
                        resources to those in need and make a real difference in your community.
                      </p>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="card h-10">
                            <img src={slogan1} alt="Blood Bank" className="card-img-top" />
                          </div>
                        </div>
                        <div className="text-center">
                          <Link to="/about-donation" className="btn btn-outline-primary">
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <img src={slogan2} alt="Blood Donation" className="card-img-top" />
                  </div>
                </div>
              </div>

              {userRole === 'Recipient' && (
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h2 className="card-title text-center mb-4" style={{ color: '#e74c3c' }}>Recipient Information</h2>
                        <p className="card-text">
                          As a recipient, you can search for available blood donors and submit requests for urgent blood needs.
                          Our team will work hard to connect you with compatible donors and ensure you receive the necessary
                          blood transfusions.
                        </p>
                        <div className="text-center">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {userRole === 'Donor' && (
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h2 className="card-title text-center mb-4" style={{ color: '#f1c40f' }}>Donor Information</h2>
                        <p className="card-text">
                          As a donor, you play a crucial role in saving lives. By regularly donating blood, you can help
                          replenish the blood supply and ensure that those in need have access to the essential resources they
                          require.
                        </p>
                        <div className="text-center">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FontAwesomeIcon icon={faUserCircle} size="5x" className="mb-3" style={{ color: '#8e44ad' }} />
                      <h2 className="card-title" style={{ color: '#8e44ad' }}>Hello, {}</h2>
                      <p className="card-text">Explore your user dashboard and manage your profile.</p>
                      <Link to="/profile" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FontAwesomeIcon icon={faDroplet} size="5x" className="mb-3" style={{ color: '#e67e22' }} />
                      <h2 className="card-title" style={{ color: '#e67e22' }}>Donor Dashboard</h2>
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
                      <h2 className="card-title text-center mb-4" style={{ color: '#16a085' }}>Find a Blood Bank</h2>
                      <p className="card-text text-center text-muted mb-4">
                        Search for blood banks in your area to find the nearest location to donate blood or pick up blood requests.
                      </p>
                      <div className="text-center">
                        <Link to="/bloodbank" className="btn btn-outline-success">
                          <FontAwesomeIcon icon={faFlask} className="me-2" /> Find a Blood Bank
                        </Link>
                      </div>
                    </div>
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