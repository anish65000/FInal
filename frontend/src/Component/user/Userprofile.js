import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUserData(response.data.userProfile[0]); // Accessing the first user profile object from the array
          setLoading(false);
        } catch (error) {
          setError(error.response.data.message);
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  // Destructure user data
  const { userName, userAge, userGender, userBloodGroup, userPhone, userEmail, userAddress, userRole } = userData;

  return (
    <> <UserNavbar/>
    <div className="flex justify-center mt-8">
      <div className="max-w-4xl w-full bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-custom-green">User Profile</h4>
          <button className=" bg-custom-green text- font-semibold text-white  focus:outline-none">
            Edit Profile
          </button>
        </div>
        <hr className="my-4 border-gray" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">User Name:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray ">User Age:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userAge}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">User Gender:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userGender}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Blood Group:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userBloodGroup}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userPhone}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userEmail}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userAddress}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role:</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewProfile;
