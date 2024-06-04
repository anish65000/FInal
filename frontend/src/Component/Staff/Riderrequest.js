import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

function RideRequestForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { requestId } = useParams();
  const [destination, setDestination] = useState('');
  const [selectedRider, setSelectedRider] = useState('');
  const [riders, setRiders] = useState([]);
  const [donorDetails, setDonorDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bloodbank-riders');
        setRiders(response.data.riders);
      } catch (error) {
        console.error('Error fetching riders:', error);
      }
    };

    fetchRiders();

    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/urgentrequests/${requestId}`);
        const requestData = response.data;
        setDestination(requestData.urgentRequest.location);
      } catch (error) {
        console.error('Error fetching ride request data:', error);
      }
    };

    if (requestId) {
      fetchRequestData();
    }
  }, [requestId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/requestride',
        {
          riderId: selectedRider,
          destination,
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);
      setDonorDetails(response.data.donorDetails);
      toast.success('Ride request created successfully');
    } catch (error) {
      console.error('Error posting ride request:', error);
      if (error.response && error.response.status === 409) {
        toast.error(`Conflict: ${error.response.data.message}`);
      } else {
        toast.error('Error posting ride request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StaffNavbar />
      <StaffSidebar />
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Request Ride</h2>
          </div>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">
                Destination:
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rider" className="block text-gray-700 font-bold mb-2">
                Select Rider:
              </label>
              <select
                id="rider"
                value={selectedRider}
                onChange={(e) => setSelectedRider(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Rider</option>
                {riders.map((rider) => (
                  <option key={rider.rider_id} value={rider.rider_id}>
                    {rider.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Requesting Ride...' : 'Request Ride'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RideRequestForm;
