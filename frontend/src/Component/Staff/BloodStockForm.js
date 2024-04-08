import React, { useState } from 'react';
import axios from 'axios';

const BloodStockForm = () => {
  // Use consistent naming for clarity
  const [bloodStockData, setBloodStockData] = useState({
    bloodGroup: '',
    totalUnit: '',
    currentStock: '',
    bloodStatus: '',
  });

  const handleChange = (event) => {
    setBloodStockData({ ...bloodStockData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('`http://localhost:5000/login/stf/inv/insert', bloodStockData);
      console.log('Blood stock inserted successfully:', response.data);

      // Handle success
      // - Clear the form
      setBloodStockData({
        bloodGroup: '',
        totalUnit: '',
        currentStock: '',
        bloodStatus: '',
      });
      // - Show a success message to the user
    } catch (error) {
      console.error('Error during blood stock insertion:', error);

      // Handle error
      // - Show an error message to the user with specific details
    }
  };
 return (
    <div className="container mx-auto grid grid-cols-2 gap-4 bg-gray shadow-md rounded-md p-8">
      <h1 className="text-4xl font-bold mt-5 mb-8 text-center text-red-500">Blood Stock Form</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-200 rounded-md">
        <div className="mb-4">
          <label htmlFor="blood_group" className="block text-sm font-medium text-gray-600">
            Blood Group
          </label>
          <input
            type="text"
            id="blood_group"
            name="blood_group"
            value={bloodStockData.bloodGroup}
            onChange={handleChange}
            className="input-field w-full border border-gray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="total_unit" className="block text-sm font-medium text-gray-600">
            Total Unit
          </label>
          <input
            type="number"
            id="total_unit"
            name="total_unit"
            value={bloodStockData.totalUnit}
            onChange={handleChange}
            className="input-field w-full border border-gray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="current_stock" className="block text-sm font-medium text-gray-600">
            Current Stock
          </label>
          <input
            type="number"
            id="current_stock"
            name="current_stock"
            value={bloodStockData.currentStock}
            onChange={handleChange}
            className="input-field w-full border border-gray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="blood_status" className="block text-sm font-medium text-gray-600">
            Blood Status
          </label>
          <input
            type="text"
            id="blood_status"
            name="blood_status"
            value={bloodStockData.bloodStatus}
            onChange={handleChange}
            className="input-field w-full border border-gray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="submit-button bg-red hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
            Submit
          </button>
        </form>
      </div>
    
  );
};

export default BloodStockForm;
