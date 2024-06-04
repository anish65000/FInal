import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

const BloodInventoryForm = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [bloodStatus, setBloodStatus] = useState('');
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login/stf/inv/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blood_group: bloodGroup,
          total_unit: totalUnit,
          current_stock: currentStock,
          blood_status: bloodStatus,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success('Blood inventory submitted successfully!');
      } else {
        toast.error('Error submitting blood inventory.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <StaffNavbar />
      <StaffSidebar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Blood Inventory</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="bloodGroup" className="block text-gray-700 font-semibold">
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="totalUnit" className="block text-gray-700 font-semibold">
                Total Unit:
              </label>
              <input
                type="number"
                id="totalUnit"
                value={totalUnit}
                onChange={(e) => setTotalUnit(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentStock" className="block text-gray-700 font-semibold">
                Current Stock:
              </label>
              <input
                type="number"
                id="currentStock"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloodStatus" className="block text-gray-700 font-semibold">
                Blood Status:
              </label>
              <select
                id="bloodStatus"
                value={bloodStatus}
                onChange={(e) => setBloodStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BloodInventoryForm;