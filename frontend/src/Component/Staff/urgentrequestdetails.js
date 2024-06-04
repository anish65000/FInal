import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

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
    return (
      <div className="flex justify-center items-center h-screen">
        
      </div>
    );
  }
  const { message, Recipent_name,location, userPhone, requested_at, required_by_time, donor_id, user_id } = urgentRequest;
  return (
    <>
      <StaffNavbar />
      <StaffSidebar />
      <div className="max-w-4xl mx-auto p-6 bg-green shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Urgent Request Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <h2 className={`text-xl font-bold mb-2 ${required_by_time < new Date() ? 'text-red' : ''}`}>
              Request Details
            </h2>
            <div className="mb-4">
              <span className="font-bold">Message:</span>
              <p className="text-gray">{message}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold">User Name:</span>
              <p className="text-gray">{Recipent_name}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold">Location:</span>
              <p className="text-gray">{location}</p>
            </div>

            <div className="mb-4">
              <span className="font-bold">Location:</span>
              <p className="text-gray">{location}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold">User Phone:</span>
              <a href={`tel:${userPhone}`} className="text-gray">
                {userPhone}
              </a>
            </div>
            <div className="mb-4">
              <span className="font-bold">Requested At:</span>
              <p className="text-gray-">{requested_at}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold">Required By Time:</span>
              <p className="text-gray">{required_by_time}</p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Additional Details</h2>
            <div className="mb-4">
              <span className="font-bold">Donor ID:</span>
              <p className="text-gray">{donor_id}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold">User ID:</span>
              <p className="text-gray">{user_id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UrgentRequestDetail;