// RequestedRides.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DonorNavbar from './DonorNavbar';

const RequestedRides = () => {
  const [requestedRides, setRequestedRides] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestedRides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/requested-rides', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRequestedRides(response.data.requestedRides);
      } catch (error) {
        setError('Error fetching requested rides');
      }
    };

    fetchRequestedRides();
  }, []);

  const handleGetDonorLocation = async (donorId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ride-details/${donorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { latitude, longitude, userName } = response.data.rideDetails;
      console.log('Donor Location:', latitude, longitude, userName);
      navigate(`/donor-location/${donorId}`); // Navigate to the donor location page
    } catch (error) {
      console.error('Error fetching donor location:', error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <DonorNavbar/>
    <div className="container bg-nav-gray">
      <h2 className="my-4 text-center text-primary">Requested Rides</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {requestedRides.map(ride => (
          <div key={ride.donor_id} className="col">
            <div className="card rounded-lg   shadow-sm">
              <div className="card-body bg-tahiti">
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="card-title text-primary">{`Destination: ${ride.destination}`}</h5>
                  <div className="text-muted bg-green">
                    <small><strong>User:</strong> {ride.recipient_name}</small><br />
                    <small><strong>Phone:</strong> {ride.userPhone}</small>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-primary"><strong>Latitude:</strong> {ride.latitude}</li>
                  <li className="list-group-item text-primary"><strong>Longitude:</strong> {ride.longitude}</li>
                  <li className="list-group-item"><strong>Donor Details:</strong></li>
                  {JSON.parse(ride.donor_details).map((donor, index) => (
                    <li key={index} className="list-group-item">
                      <div className="row">
                        <div className="col">
                          <div className="text-muted text-success"><strong>Donor Name:</strong> {donor.userName}</div>
                          <div className="text-muted text-primary"><strong>Donor Phone:</strong> {donor.userPhone}</div>
                        </div>
                        <div className="col">
                          <div className="text-muted text-danger"><strong>User Address:</strong> {donor.userAddress}</div>
                          <div className="text-muted text-warning"><strong>Previous Donation:</strong> {donor.previous_dontaion}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-success mt-3"
                  onClick={() => handleGetDonorLocation(ride.donor_id)}
                >
                  Get Donor Location
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default RequestedRides;
