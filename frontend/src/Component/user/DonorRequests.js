// DonorRequests.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const DonorRequests = () => {
  const location = useLocation();
  const bloodRequests = location.state?.bloodRequests || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Donor Requests</h1>
      {bloodRequests.length > 0 ? (
        <ul>
          {bloodRequests.map((request) => (
            <li key={request.id} className="bg-gray-100 p-4 rounded-lg mb-2">
              <p>
                <strong>User:</strong> {request.userName}
              </p>
              <p>
                <strong>Message:</strong> {request.message}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blood requests.</p>
      )}
    </div>
  );
};

export default DonorRequests;