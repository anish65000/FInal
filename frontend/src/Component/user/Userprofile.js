import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="right w-full md:w-3/3 pl-20  mt-4 flex flex-col justify-start bg-white-gray rounded-md">
      <div className="w-full justify-end">
        <button
        
          className="text-lg font-bold mb-5 text-white border border-custom-green px-4 py-2 rounded-md bg-custom-green hover:bg-pastel-green focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="max-w-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold mb-2 text-custom-green">User Profile</h4>
          </div>
          <hr className="my-2 border-gray-600" />
          <div className="mt-4 space-y-4">
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userName}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userAge" className="block text-sm font-medium text-gray-700">User Age</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userAge}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userGender" className="block text-sm font-medium text-gray-700">User Gender</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userGender}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userBloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userBloodGroup}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userPhone}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userEmail}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userAddress}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 p-2 w-full border-gray-300 rounded-md">{userRole}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          {/* Display user image if available */}
          {/* Input field for uploading image */}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
