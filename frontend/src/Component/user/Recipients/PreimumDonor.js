import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../UserNavbar';

const PremiumDonorList = () => {
  const [premiumDonors, setPremiumDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPremiumDonors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donors');
        const data = await response.json();

        if (Array.isArray(data)) {
          setPremiumDonors(data);
        } else {
          setError('Invalid data format. Expected an array.');
        }
      } catch (error) {
        console.error('Error fetching premium donors:', error);
        setError('Unable to fetch premium donors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumDonors();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <UserNavbar/>
      <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Premium Donor List</h2>
        </div>
        <div className="mt-4 bg-tahiti">
          {premiumDonors.map((donor) => (
            <div key={donor.premium_donor_id} className="donor-item  bg-green mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="donor-image-container">
                  <img
                    src={`http://localhost:5000${donor.profile_picture}`}
                    alt={`${donor.userName} profile picture`}
                    className="donor-image"
                    style={{ width: '250px', height: '200px' }} // Fixed size styling
                    onError={(e) => console.error('Error loading image:', e)}
                  />
                </div>
                <div className="donor-info">
                  <div className="text-gray font-bold">Name</div>
                  <div>{donor.userName}</div>
                  <div className="text-gray-700 font-bold">Blood Group</div>
                  <div>{donor.userBloodGroup}</div>
                  <div className="text-gray-700 font-bold">Availability</div>
                  <div>{donor.availability_time}</div>
                  <div className="text-gray-700 font-bold">Address</div>
                  <div>{donor.userAddress}</div>
                </div>
                <div className="col-span-1">
                  <div className="text-gray-700 font-bold">Phone Number</div>
                  <div>{donor.userPhone}</div>
                  <div className="text-gray-700 font-bold">Age</div>
                  <div>{donor.userAge}</div>
                  <div className="text-gray-700 font-bold">Previous Donation</div>
                  <div>{donor.previous_dontaion}</div>
                  <div className="text-gray-700 font-bold">Location</div>
                  <div>Latitude: {donor.latitude}, Longitude: {donor.longitude}</div>
                </div>
              </div>
              <Link to={`/donors/${donor.premium_donor_id}`}>
                <button className='bg-red hover:bg-blue text-white font-bold py-2 px-4 rounded mt-4' type="button">View Profile</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PremiumDonorList;
