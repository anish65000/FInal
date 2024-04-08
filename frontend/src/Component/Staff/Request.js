import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UrgentRequestList() {
  const [urgentRequests, setUrgentRequests] = useState([]);

  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  const fetchUrgentRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/urgentrequests');
      setUrgentRequests(response.data.urgentRequests);
    } catch (error) {
      console.error('Error fetching urgent requests:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Urgent Requests List</h2>
      <ul>
        {urgentRequests.map((request) => (
          <li key={request.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <p className="text-gray-800 mb-2">Message: {request.message}</p>
            <p className="text-gray-700 mb-2">User Name: {request.userName}</p>
            <p className="text-gray-700 mb-2">User Phone: {request.userPhone}</p>
            <p className="text-gray-700 mb-2">Requested At: {request.requested_at}</p>
            <p className="text-gray-700 mb-2">Required By Time: {request.required_by_time}</p>
            <p className="text-gray-700 mb-2">Donor ID: {request.donor_id}</p>
            <p className="text-gray-700 mb-4">User ID: {request.user_id}</p>
            <div className="flex space-x-4">
              <Link to={`/urgentrequests/${request.id}`} className="text-blue-500 hover:text-blue-700">View Request Details</Link>
              <Link to={`/donordetails/${request.donor_id}`} className="text-blue-500 hover:text-blue-700">View Donor Details</Link>
              <Link to={`/Riderequest/${request.id}`} className="text-blue-500 hover:text-blue-700">Ride request</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrgentRequestList;
