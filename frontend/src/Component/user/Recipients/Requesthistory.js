import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodRequestList = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/login/stf/request', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBloodRequests(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Missing or invalid user ID.');
        } else if (err.response && err.response.status === 404) {
          setError('No blood requests found for this user.');
        } else {
          setError('Internal Server Error');
        }
      }
    };

    fetchBloodRequests();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-green">
      <h2 className="text-2xl font-bold text-center mb-4">Blood Requests</h2>
      {error && <p className="text-red text-center mb-4">{error}</p>}
      {bloodRequests.length > 0 ? (
        <ul className="list-none rounded-lg shadow-md px-4 py-2">
          {bloodRequests.map((request) => (
            <li
              key={request.id}
              className="flex bg-lightblue rounded-lg px-4 py-3 mb-2 hover:bg-gray-100"
            >
              <div className="flex-grow">
                <p className="text-base font-medium mb-1">
                  <span className="text-gray-700 font-bold">Request ID:</span> {request.id}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-700 font-bold">Blood Group:</span> {request.blood_group}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-700 font-bold">Units Requested:</span> {request.unit}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-700 font-bold">Patient Name:</span> {request.patient_name}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-gray-700 font-bold">Request Date:</span>{' '}
                  {new Date(request.request_date).toLocaleString()}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end justify-center">
                <p className="text-sm text-gray-500">
                  <span className="text-gray-700 font-bold">Patient Address:</span>{' '}
                  {request.patient_address}
                </p>
                <p className="text-sm text-gray">
                  <span className="text-gray font-bold">Patient Contact:</span>{' '}
                  {request.patient_contact}
                </p>
                
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No blood requests found.</p>
      )}
    </div>
  );
};

export default BloodRequestList;
