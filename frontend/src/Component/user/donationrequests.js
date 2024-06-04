import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar.js';
import DonorSidebar from './Donor/Donorsidebar.js';
import { FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/donar-request', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError('Failed to fetch donation requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/update-status', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setSuccess('Status updated successfully');
      const updatedRequests = requests.map((request) =>
        request.id === requestId ? { ...request, status } : request
      );
      setRequests(updatedRequests);
    } catch (error) {
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <UserNavbar />
    <div className="flex">
      <DonorSidebar />
      <div className="max-w-7xl mx-10 my-4 mt-10">
        <h2 className="text-2xl font-bold mb-4 mx-9  text-center">Donation Requests</h2>
  
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {error && (
          <div
            className="bg-red border border-red text-red px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div
            className="bg-green  border border-green  text-green  px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{success}</p>
          </div>
        )}
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-pro-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xl text-blue-500">
                    ID: {request.id}
                  </span>
                  <div className="text-gray">
                    {request.status === 'pending' && <FaClock />}
                    {request.status === 'confirm' && (
                      <FaCheck className="text-green" />
                    )}
                    {request.status === 'denied' && (
                      <FaTimes className="text-red" />
                    )}
                  </div>
                </div>
                <p className="text-gray text-base mb-2">
                  Donor ID: {request.donor_id}
                </p>
                <p className="text-gray text-base mb-2">
                  User ID: {request.user_id}
                </p>
                <p className="text-gray text-base mb-2">
                  Requested at: {new Date(request.requested_at).toLocaleString()}
                </p>
                <p className="text-gray text-base mb-2">
                  Message: {request.message}
                </p>
                <p className="text-gray text-base mb-4">
                  Recipient Name: {request.recipient_name}
                </p>
              </div>
              {request.status === 'pending' && (
                <div className="px-6 py-4 bg-green flex space-x-4 justify-between">
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'confirm')}
                    className="bg-blue-100 hover:bg-orange text-white font-bold py-2 px-4 rounded flex items-center flex-grow"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin bg-lightblue rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <>
                        <FaCheck className="mr-2" />
                        Accept
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(request.id, 'denied')}
                    className="bg-red text-white font-bold py-2 px-4 rounded flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin bg-red rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <>
                        <FaTimes className="mr-2 bg-red" />
                        Reject
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default DonationRequests;
