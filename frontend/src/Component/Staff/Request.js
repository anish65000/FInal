import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

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
    <>
      <StaffNavbar></StaffNavbar>
      <StaffSidebar></StaffSidebar>
      <div className="max-w-4xl mx-auto px-4 bg-paleturquoise py-8">
        <h2 className="text-3xl font-semibold mb-4">Urgent Requests List</h2>
        <ul>
          {urgentRequests.map((request) => (
            <li key={request.id} className="bg-green shadow-md rounded-lg p-6 mb-4">
              <p className="text-gray mb-2">Message: {request.message}</p>
              <p className="text-gray mb-2"> Donor Name: {request.userName}</p>
              <p className="text-gray mb-2">User Phone: {request.userPhone}</p>
              <p className="text-gray mb-2">Requested At: {request.requested_at}</p>
              <p className="text-gray mb-2">Required By Time: {request.required_by_time}</p>
              <p className="text-gray mb-2">Donor ID: {request.donor_id}</p>
              <p className="text-gray mb-4">User ID: {request.user_id}</p>
              <div className="flex space-x-4">
                <button className="bg-paleturquoise shadow-md rounded-lg p-2 mb-2">
                  <Link to={`/urgentrequests/${request.id}`} className="text-blue-500 hover:text-green">View Request Details</Link>
                </button>
                <button className="bg-paleturquoise shadow-md rounded-lg p-2 mb-2">
                  <Link to={`/donordetails/${request.donor_id}`} className="text-blue-500 hover:text-green">View Donor Details</Link>
                </button >
                <button className="bg-paleturquoise shadow-md rounded-lg p-2 mb-2">
                  <Link to={`/Riderequest/${request.id}`} className="text-blue-500 hover:text-green">Ride request</Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UrgentRequestList;
