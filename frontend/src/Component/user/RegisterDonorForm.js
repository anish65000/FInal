import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PremiumDonorRegistration = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  const [donorHealth, setDonorHealth] = useState('');
  const [previousDonation, setPreviousDonation] = useState('');
  const [donorType, setDonorType] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('availabilityTime', availabilityTime);
    formData.append('donorhealth', donorHealth);
    formData.append('previousdontaion', previousDonation);
    formData.append('DonorType', donorType);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:5000/register/premiumdonor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your authentication token
        }
      });

      setMessage(response.data.message);
      // Reset form fields if registration is successful
      if (response.data.premiumDonorId) {
        setLatitude('');
        setLongitude('');
        setAvailabilityTime('');
        setDonorHealth('');
        setPreviousDonation('');
        setDonorType('');
        setProfilePicture(null);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-bermuda">
  <h2 className="text-xl font-bold text-center mb-4">Premium Donor Registration</h2>

  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <label htmlFor="latitude" className="text-sm font-medium text-gray-700">Latitude</label>
    <input
      type="text"
      className="rounded-md border border-gray  px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      id="latitude"
      value={latitude}
      onChange={(e) => setLatitude(e.target.value)}
      required
    />

    <label htmlFor="longitude" className="text-sm font-medium text-gray-700">Longitude</label>
    <input
      type="text"
      className="rounded-md border border-gray  px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      id="longitude"
      value={longitude}
      onChange={(e) => setLongitude(e.target.value)}
      required
    />

    <label htmlFor="availabilityTime" className="text-sm font-medium text-gray-700">Availability Time</label>
    <input
      type="text"
      className="rounded-md border border-gray  px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      id="availabilityTime"
      value={availabilityTime}
      onChange={(e) => setAvailabilityTime(e.target.value)}
      required
    />

    <div className="flex flex-col">  <label htmlFor="donorHealth" className="text-sm font-medium text-gray-700 mb-1">Donor Health</label>
      <input
        type="text"
        className="rounded-md border border-gray px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        id="donorHealth"
        value={donorHealth}
        onChange={(e) => setDonorHealth(e.target.value)}
        required
      />

      <label htmlFor="previousDonation" className="text-sm font-medium text-gray-700 mt-2">Previous Donation</label>
      <input
        type="text"
        className="rounded-md border border-gray  px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        id="previousDonation"
        value={previousDonation}
        onChange={(e) => setPreviousDonation(e.target.value)}
        required
      />
    </div>

    <label htmlFor="donorType" className="text-sm font-medium text-gray-700">Donor Type</label>
    <input
      type="text"
      className="rounded-md border border-gray px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      id="donorType"
      value={donorType}
      onChange={(e) => setDonorType(e.target.value)}
      required
    />

    <label htmlFor="profilePicture" className="text-sm font-medium text-gray-700">Profile Picture</label>
    <input
      type="file"
      className="rounded-md border border-gray px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      id="profilePicture"
      onChange={(e) => setProfilePicture(e.target.files[0])}
      required
    />

    <button type="submit" className="bg-green text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Register
    </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default PremiumDonorRegistration;