// ViewProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import EditProfile from './EditProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCalendarAlt, faGenderless, faBloodDrop, faPhone, faEnvelope, faMapMarkerAlt, faUserTag, faDroplet } from '@fortawesome/free-solid-svg-icons';

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setUserData(response.data.userProfile[0]);
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
  }, [updatedUserData]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateUserData = (updatedData) => {
    setUpdatedUserData(updatedData);
  };

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
  const { userName, userAge, userGender, userBloodGroup, userPhone, userEmail, userAddress, userRole } = updatedUserData || userData;

  return (
    <>
      <UserNavbar />
      {isEditing ? (
        <EditProfile
          userData={userData}
          onCancelEdit={handleCancelEdit}
          onUpdateUserData={handleUpdateUserData}
        />
      ) : (
        <div className="flex justify-center mt-8">
          <div className="max-w-4xl w-full bg-white rounded-md shadow-md p-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold text-custom-green">User Profile</h4>
              <button
                className="bg-custom-green text-font-semibold text-white focus:outline-none"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
            <hr className="my-4 border-gray" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faUserCircle} className="mr-2" />User Name:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userName}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />User Age:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userAge}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faGenderless} className="mr-2" />User Gender:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userGender}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faDroplet} className="mr-2" />Blood Group:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userBloodGroup}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faPhone} className="mr-2" />Phone:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userPhone}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />Email:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userEmail}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />Address:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userAddress}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faUserTag} className="mr-2" />Role:</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;