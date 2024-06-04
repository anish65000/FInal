import React, { useEffect, useState } from 'react';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const DonatedUserDetails = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/history')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (userData.length === 0) {
    return <div className="loading">Loading...</div>; // Custom loading class
  }

  const formatDate = dateStr => new Date(dateStr).toISOString().replace('T', ' ').replace('Z', '');

  return (
    <>
    <StaffNavbar/>
    <StaffSidebar/>
    <div className="user-details container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Donated User Details</h1>
      {userData.map(user => (
        <div key={user.user_id} className="bg-green rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <p className="font-medium w-1/3">Name:</p>
              <p className="text-gray-700 w-2/3">{user.user_name}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Staff ID:</p>
              <p className="text-gray-700 w-2/3">{user.stf_id}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Age:</p>
              <p className="text-gray-700 w-2/3">{user.user_age}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Phone:</p>
              <p className="text-gray-700 w-2/3">{user.user_phone}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Slot Time:</p>
              <p className="text-gray-700 w-2/3">{formatDate(user.slot_time)}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Blood Group:</p>
              <p className="text-gray-700 w-2/3">{user.blood_group}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Unit:</p>
              <p className="text-gray-700 w-2/3">{user.unit}</p>
            </div>
            <div className="flex items-center">
              <p className="font-medium w-1/3">Donation Time:</p>
              <p className="text-gray-700 w-2/3">{formatDate(user.donation_time)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default DonatedUserDetails;
