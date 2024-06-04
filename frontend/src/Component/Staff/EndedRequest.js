import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

function EndedUrgentRequestList() {
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 3;

  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  const fetchUrgentRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ended/urgentrequests');
      setUrgentRequests(response.data.urgentRequests);
    } catch (error) {
      console.error('Error fetching urgent requests:', error);
    }
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = urgentRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <StaffNavbar />
      <StaffSidebar />
      <div className="max-w-4xl mx-auto px-4 bg-paleturquoise py-8">
        <h2 className="text-3xl font-semibold mb-4">Ended Urgent Requests List</h2>
        <ul>
          {currentRequests.map((request) => (
            <li key={request.id} className="bg-green shadow-md rounded-lg p-6 mb-4">
              <p className="text-gray mb-2">Message: {request.message}</p>
              <p className="text-gray mb-2">Donor Name: {request.userName}</p>
              <p className="text-gray mb-2">Recipient_name: {request.Recipent_name}</p>
              <p className="text-gray mb-2">location: {request.location}</p>
              <p className="text-gray mb-2">User Phone: {request.userPhone}</p>
              <p className="text-gray mb-2">Requested At: {request.requested_at}</p>
              <p className="text-gray mb-2">Required By Time: {request.required_by_time}</p>
              <p className="text-gray mb-2">Donor ID: {request.donor_id}</p>
              <p className="text-gray mb-4">User ID: {request.user_id}</p>
              <div className="flex space-x-4">
                <button className="bg-paleturquoise shadow-md rounded-lg p-2 mb-2">
                  <Link to={`/urgentrequests/${request.id}`} className="text-blue-500 hover:text-green">View Request Details</Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: Math.ceil(urgentRequests.length / requestsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default EndedUrgentRequestList;
