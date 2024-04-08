import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UrgentRequestDetail() {
  const { requestId } = useParams();
  const [urgentRequest, setUrgentRequest] = useState(null);

  useEffect(() => {
    if (requestId) {
      fetchUrgentRequestDetails();
    }
  }, [requestId]);

  const fetchUrgentRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/urgentrequests/${requestId}`);
      setUrgentRequest(response.data.urgentRequest);
    } catch (error) {
      console.error('Error fetching urgent request details:', error);
    }
  };

  if (!urgentRequest) {
    return <div>Loading...</div>;
  }

  const { message, userName, userPhone, requested_at, required_by_time, donor_id, user_id } = urgentRequest;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Clearer Visual Hierarchy */}
      <h1 className="text-2xl font-bold mb-4">Urgent Request Details</h1>

      {/* Meaningful Visual Cues - Deadline */}
      <h2 className={`text-xl font-bold mb-2 ${required_by_time < new Date() ? 'text-red-500' : ''}`}>
        Request Details
      </h2>

      {/* Organized Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-2">
          <span className="font-bold">Message:</span>
          <p>{message}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold">User Name:</span>
          <p>{userName}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold">User Phone:</span>
          <a href={`tel:${userPhone}`}>{userPhone}</a> {/* Clickable Phone Number */}
        </div>
        <div className="mb-2">
          <span className="font-bold">Requested At:</span>
          <p>{requested_at}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold">Required By Time:</span>
          <p>{required_by_time}</p>
          {/* Consider adding a progress bar or countdown here based on required_by_time */}
        </div>
      </div>

      {/* Consider a timeline view for future enhancement */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-2">
          <span className="font-bold">Donor ID:</span>
          <p>{donor_id}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold">User ID:</span>
          <p>{user_id}</p>
        </div>
      </div>
    </div>
  );
}

export default UrgentRequestDetail;
