import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardChart from './DashboardChart';
import AdminSidebar from './AdminSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [recipientCount, setRecipientCount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [riderCount, setRiderCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [staffResponse, recipientResponse, donorResponse, riderResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/countStaff'),
          axios.get('http://localhost:5000/api/countRecipients'),
          axios.get('http://localhost:5000/api/countDonors'),
          axios.get('http://localhost:5000/api/countRider'),
        ]);

        setStaffCount(staffResponse.data.count);
        setRecipientCount(recipientResponse.data.count);
        setDonorCount(donorResponse.data.count);
        setRiderCount(riderResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-8 pb-12 px-4">
      <div className="home bg-pro-white flex flex-col flex-grow ">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center"></h2>
        <DashboardChart />
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Total Staff</h2>
            <p className="text-4xl font-bold">{staffCount}</p>
          </div>
          <div className="bg-green text-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Total Recipients</h2>
            <p className="text-4xl font-bold">{recipientCount}</p>
          </div>
          <div className="bg-yellow text-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Total Donors</h2>
            <p className="text-4xl font-bold">{donorCount}</p>
          </div>
          <div className="bg-red text-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Total Riders</h2>
            <p className="text-4xl font-bold">{riderCount}</p>
          </div>
        </div>
      </div>
    </div>   </div>
    </div>
  );
};

export default Dashboard;