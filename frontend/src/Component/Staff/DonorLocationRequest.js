import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationRequestForm = () => {
  const [donorId, setDonorId] = useState('');
  const [location, setLocation] = useState('');
  const [staffMessage, setStaffMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donorDetails, setDonorDetails] = useState(null);
  const [premiumDonors, setPremiumDonors] = useState([]);

  useEffect(() => {
    // Fetch premium donors data when the component mounts
    const fetchPremiumDonors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/premium-donors', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPremiumDonors(response.data);
      } catch (error) {
        console.error('Error fetching premium donors:', error);
      }
    };

    fetchPremiumDonors();
  }, []); // Empty dependency array to run effect only once when the component mounts

  const handleDonorChange = (e) => {
    setDonorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/location-request', {
        donorId,
        location,
        staffMessage,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setDonorDetails(response.data.donorDetails);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while submitting the request.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4 sm:px-0">
      <h2 className="text-2xl font-bold mb-4">Location Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="donorId" className="block font-medium text-gray-700">
            Donor ID:
          </label>
          <select
            id="donorId"
            value={donorId}
            onChange={handleDonorChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Donor</option>
            {premiumDonors.map((donor) => (
              <option key={donor.premium_donor_id} value={donor.premium_donor_id}>
                {donor.userName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="staffMessage" className="block font-medium text-gray-700">
            Staff Message:
          </label>
          <textarea
            id="staffMessage"
            value={staffMessage}
            onChange={(e) => setStaffMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full rounded-md py-2 px-4 font-medium transition-colors duration-300 ${
              isLoading
                ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      {donorDetails && (
        <div className="mt-4 bg-white shadow-md rounded-md p-4">
          <h3 className="text-lg font-bold mb-2">Donor Details:</h3>
          <div className="space-y-2">
            <p>Name: {donorDetails.userName}</p>
            <p>Phone: {donorDetails.userPhone}</p>
            <p>Latitude: {donorDetails.latitude}</p>
            <p>Longitude: {donorDetails.longitude}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationRequestForm;
