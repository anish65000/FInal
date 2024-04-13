import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const RiderManagement = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [updatedRiderData, setUpdatedRiderData] = useState({});
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/riders');
      setRiders(response.data.riders);
    } catch (error) {
      console.error('Error fetching riders:', error);
    }
  };

  const handleRiderEdit = (rider) => {
    setSelectedRider(rider);
    setUpdatedRiderData(rider);
  };

  const handleInputChange = (e) => {
    setUpdatedRiderData({
      ...updatedRiderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRiderUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(updatedRiderData).forEach((key) => {
        formData.append(key, updatedRiderData[key]);
      });
      if (avatar) {
        formData.append('avatar', avatar);
      }

      await axios.put(`http://localhost:5000/rider/edit/${selectedRider.rider_id}`, formData);
      fetchRiders();
      setSelectedRider(null);
      setUpdatedRiderData({});
      setAvatar(null);
    } catch (error) {
      console.error('Error updating rider:', error);
    }
  };

  const handleRiderDelete = async (riderId) => {
    try {
      await axios.delete(`http://localhost:5000/rider/${riderId}`);
      fetchRiders();
    } catch (error) {
      console.error('Error deleting rider:', error);
    }
  };

  return (
    <div className="home bg-pro-white flex flex-col flex-grow ">
      <StaffSidebar />
      <div className="flex flex-col flex-grow">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl  text-center font-bold text-custom-green hover:text-green">
              MANAGE RIDER
            </h1>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Rider
              </button>
        
            </div>
          </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-bold">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Blood Type</th>
              <th className="px-4 py-3">Bike Model</th>
              <th className="px-4 py-3">License Number</th>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider.rider_id} className="border-b">
                <td className="px-4 py-3">{rider.rider_id}</td>
                <td className="px-4 py-3">{rider.name}</td>
                <td className="px-4 py-3">{rider.email}</td>
                <td className="px-4 py-3">{rider.phone_number}</td>
                <td className="px-4 py-3">{rider.blood_type}</td>
                <td className="px-4 py-3">{rider.bike_model}</td>
                <td className="px-4 py-3">{rider.license_number}</td>
                <td className="px-4 py-3">
                <img
                          src={`http://localhost:5000/profile-pictures/${rider.avatar}`}
                          alt={`${rider.name}'s profile`}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => console.error('Error loading image:', e)}
                        />
                      
                </td>
                <td className="px-4 py-3">{rider.gender}</td>
                <td className="px-4 py-3">{rider.age}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRiderEdit(rider)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRiderDelete(rider.rider_id)}
                      className="bg-red hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRider && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Rider</h2>
          <form onSubmit={handleRiderUpdate} className="space-y-4">
            <div>
              <label className="block font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                name="name"
                value={updatedRiderData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                name="email"
                value={updatedRiderData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="phone_number">
                Phone Number:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="phone_number"
                name="phone_number"
                value={updatedRiderData.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="blood_type">
                Blood Type:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="blood_type"
                name="blood_type"
                value={updatedRiderData.blood_type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="bike_model">
                Bike Model:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="bike_model"
                name="bike_model"
                value={updatedRiderData.bike_model}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="license_number">
                License Number:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="license_number"
                name="license_number"
                value={updatedRiderData.license_number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="avatar">
                Avatar:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="gender">
                Gender:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="gender"
                name="gender"
                value={updatedRiderData.gender}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-bold mb-2" htmlFor="age">
                Age:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                id="age"
                name="age"
                value={updatedRiderData.age}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default RiderManagement;