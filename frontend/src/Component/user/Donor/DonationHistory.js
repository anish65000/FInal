import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../UserNavbar';
import DonorSidebar from './Donorsidebar';

const DonationHistory = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from local storage
  const [expanded, setExpanded] = useState(false); // State to track if container is expanded

  useEffect(() => {
    fetchDonationHistory();
  }, [token]); // Refetch data when token changes

  const fetchDonationHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/donation/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonationHistory(response.data.donationHistory);
    } catch (error) {
      console.error('Error fetching donation history:', error);
    }
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <UserNavbar />
      <div className="flex">
        <DonorSidebar />
        <div className={`container mx-auto mt-8 ${expanded ? 'lg:w-4/5' : 'lg:w-2/3'} transition-all duration-300`}>
          <div className="bg-white rounded-lg shadow-md p-6" onClick={toggleExpansion}>
            <h1 className="text-3xl font-bold mb-4">Donation History</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donationHistory.map(donation => (
                <div key={donation.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-sm font-medium mb-2">{donation.name}</div>
                  <div className="flex justify-between text-gray-500">
                    <span>Date: {new Date(donation.date).toLocaleDateString()}</span>
                    <span>Blood Group: {donation.blood_group}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Units: {donation.units}</span>
                    <span>Status: {donation.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationHistory;
