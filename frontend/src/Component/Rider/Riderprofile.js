import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faEnvelope, faPhone, faTint, faMotorcycle, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import Navbar from './RiderNavbar';

const RiderProfile = () => {
  const [riderProfile, setRiderProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiderProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/riderprofile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch rider profile');
        }
        const data = await response.json();
        setRiderProfile(data.userProfile[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiderProfile();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!riderProfile) {
    return <p className="text-center">No rider profile found</p>;
  }

  return (
    <> <Navbar />
   
     
      <h1 className="text-3xl font-bold mb-6 text-center py-8 px-4">Rider Profile</h1>
      <div className="flex flex-col items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="bg-green rounded-lg shadow-md p-6 flex flex-col items-cente r">
          <img
            src={`http://localhost:5000/profile-pictures/${riderProfile.avatar}`}
            alt={`${riderProfile.name}'s profile`}
            className="w-32 h-32 rounded-full object-cover"
            onError={(e) => console.error('Error loading image:', e)}
          />
          <p className="text-xl font-bold mt-4">{riderProfile.name}</p>
          <p className="text-gray-600">{riderProfile.email}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        </div>
        <div className="bg-green rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold mb-4">Basic Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-blue-500" /> Rider ID: {riderProfile.rider_id}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" /> Email: {riderProfile.email}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" /> Phone: {riderProfile.phone_number}
              </p>
            </div>
            <div>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faTint} className="mr-2 text-blue-500" /> Blood Type: {riderProfile.blood_type}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMotorcycle} className="mr-2 text-blue-500" /> Bike Model: {riderProfile.bike_model}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-blue-500" /> License Number: {riderProfile.license_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RiderProfile;
