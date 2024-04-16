// EditProfile.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCalendarAlt, faGenderless, faPhone, faEnvelope, faMapMarkerAlt, faUserTag, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = ({ userData, onCancelEdit, onUpdateUserData }) => {
  const [formData, setFormData] = useState({
    userName: userData.userName,
    userAge: userData.userAge,
    userGender: userData.userGender,
    userBloodGroup: userData.userBloodGroup,
    userPhone: userData.userPhone,
    userEmail: userData.userEmail,
    userAddress: userData.userAddress,
    userRole: userData.userRole,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/profile',
        { userProfile: formData },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Handle successful update
      toast.success('Profile updated successfully');
      onCancelEdit();
      onUpdateUserData(formData);
    } catch (error) {
      // Handle error
      console.error('Error updating user profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-4xl w-full bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-custom-green">Edit Profile</h4>
          <div>
            <button
              className="mr-4 bg-gray-200 text-gray-700 font-semibold focus:outline-none"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
            <button
              className="bg-custom-green text-white font-semibold focus:outline-none"
              onClick={handleSaveProfile}
            >
              Save
            </button>
          </div>
        </div>
        <hr className="my-4 border-gray" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faUserCircle} className="mr-2" />User Name:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />User Age:</label>
              <input
                type="number"
                name="userAge"
                value={formData.userAge}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faGenderless} className="mr-2" />User Gender:</label>
              <select
                name="userGender"
                value={formData.userGender}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faDroplet} className="mr-2" />
                Blood Group:
              </label>
              <select
                name="userBloodGroup"
                value={formData.userBloodGroup}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faPhone} className="mr-2" />Phone:</label>
              <input
                type="tel"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />Email:</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />Address:</label>
              <textarea
                name="userAddress"
                value={formData.userAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"><FontAwesomeIcon icon={faUserTag} className="mr-2" />Role:</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              >
                <option value="">Select Role</option>
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;