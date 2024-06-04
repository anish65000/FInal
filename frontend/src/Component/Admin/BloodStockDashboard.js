import React, { useState, useEffect } from 'react';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';
import AdminSidebar from './AdminSidebar';

const BloodInventoryDashboard = () => {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    // Fetch the blood inventory data from the backend (assuming a secure API)
    fetch('http://localhost:5000/login/stf/inv') // Replace with actual secure API endpoint
      .then(response => response.json())
      .then(data => setBloodInventory(data))
      .catch(error => console.error('Error fetching blood inventory:', error));
  }, []);

  const bloodGroupColors = {
    'A+': 'bg-pastel-green text-gray',
    'A-': 'bg-blood text-gray',
    'B+': 'bg-yellow text-gray',
    'B-': 'bg-yellowX text-gray',
    'AB+': 'bg-purple text-gray',
    'AB-': 'bg-custom-orange text-gray',
    'O+': 'bg-bermuda text-gray',
    'O-': 'bg-custom-pink text-gray',
  };

  const handleClick = index => {
    setClickedIndex(index === clickedIndex ? null : index);
  };

  return (
    
    <div className="bg-gray-100 min-h-screen pt-8 pb-12 px-4">
      <div className="home bg-pro-white flex flex-col flex-grow ">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Blood Inventory Dashboard
      </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bloodInventory.map((item, index) => (
          <div
            key={item.id}
            className={`p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out ${
              bloodGroupColors[item.blood_group]
            } ${index === clickedIndex ? 'transform scale-105 transition-transform' : ''}`}
            onClick={() => handleClick(index)}
          >
            <h3 className="text-2xl font-bold mb-2">{item.blood_group}</h3>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg">Total Units:</p>
              <p className="text-lg font-bold">{item.total_unit}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg">Current Stock:</p>
              <p className="text-lg font-bold">{item.current_stock}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg">Blood Status:</p>
              <p className="text-lg font-bold">{item.blood_status}</p>
            </div>
            <p className="text-lg">Created At: {item.created_at}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default BloodInventoryDashboard;
