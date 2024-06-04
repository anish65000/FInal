import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePremiumDonor = ({ donorId }) => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    availability: '',
    profilePicture: null,
    donorHealth: '',
    donationStatus: '',
  });

  useEffect(() => {
    fetchDonorData();
  }, []);

  const fetchDonorData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/donors/${donorId}`);
      const { latitude, longitude, availability, profile_picture, donor_health, previous_dontaion } = response.data;
      setFormData({
        latitude,
        longitude,
        availability,
        profilePicture: profile_picture,
        donorHealth: donor_health,
        donationStatus: previous_dontaion,
      });
    } catch (error) {
      console.error('Error fetching donor data:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }

    try {
      const response = await axios.put(`/api/updatedonors/${donorId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      // Reset the form or perform any other desired actions after successful update
    } catch (error) {
      console.error('Error updating premium donor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
          Latitude:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="latitude"
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
          Longitude:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="longitude"
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="availability">
          Availability:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="availability"
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePicture">
          Profile Picture:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="profilePicture"
          type="file"
          name="profilePicture"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="donorHealth">
          Donor Health:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="donorHealth"
          type="text"
          name="donorHealth"
          value={formData.donorHealth}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="donationStatus">
          Donation Status:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="donationStatus"
          type="text"
          name="donationStatus"
          value={formData.donationStatus}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Premium Donor
        </button>
      </div>
    </form>
  );
};

export default ManagePremiumDonor;