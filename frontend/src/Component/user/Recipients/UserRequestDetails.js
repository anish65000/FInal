import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import UserNavbar from '../UserNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UrgentRequestsList = () => {
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchUrgentRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await axios.get('http://localhost:5000/donor/urgentrequests', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setUrgentRequests(response.data.urgentRequests);
      } catch (error) {
        setError('Error fetching urgent requests');
      } finally {
        setLoading(false);
      }
    };

    fetchUrgentRequests();
  }, []);

  const handleRatingChange = (requestId, event) => {
    setRatings({
      ...ratings,
      [requestId]: event.target.value,
    });
  };

  const submitRating = async (requestId, donorId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const ratingValue = ratings[requestId];
      if (!ratingValue || isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        toast.error('Invalid rating value');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/donor/rate',
        {
          requestId,
          donorId,
          rating: ratingValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      toast.success('Rating submitted successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error rating donor');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div>
      <UserNavbar />
      <ToastContainer />
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Urgent Requests</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {urgentRequests.map((request) => (
            <li
              key={request.id}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-700">
                Recipient: {request.recipient_name || 'N/A'}
              </h3>
              <p className="text-gray-600">Donor: {request.donor_name}</p>
              <p className="text-gray-600">Donor Phone: {request.donor_phone}</p>
              <p className="text-gray-600">
                Requested At: {moment(request.requested_at).format('YYYY-MM-DD HH:mm:ss')}
              </p>
              <p className="text-gray-600">
                Required By: {moment(request.required_by_time).format('YYYY-MM-DD HH:mm:ss')}
              </p>
              <p className="text-gray-600">Message: {request.message}</p>
              <p className="text-gray-600">Location: {request.location}</p>
              <p className="text-gray-600">Destination: {request.destination}</p>
              <p className="text-gray-600">Ride ID: {request.ride_id}</p>
              <p className="text-gray-600">Request ID: {request.request_id}</p>
              <p className="text-gray-600">Rider ID: {request.rider_id}</p>
              <p className="text-gray-600">Status: {request.status}</p>

              {request.status === 'ended' && (
                <div className="mt-4">
                  <label htmlFor={`rating-${request.id}`} className="block text-sm font-medium text-gray-700">
                    Rate Donor:
                  </label>
                  <select
                    id={`rating-${request.id}`}
                    name={`rating-${request.id}`}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleRatingChange(request.id, e)}
                  >
                    <option value="">Select the rating</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                  <button
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => submitRating(request.id, request.donor_id)}
                  >
                    Submit Rating
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UrgentRequestsList;
