import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './StaffNavbar';
import Sidebar from './StaffSidebar';

const AddRecipient = () => {
  const [newRecipient, setNewRecipient] = useState({
    recipient_name: '',
    blood_group: '',
    email: '',
    age: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login/stf/rs/insert', newRecipient)
      .then((response) => {
        console.log('Recipient added successfully:', response.data);
        // Optionally, you can redirect the user or display a success message here
      })
      .catch((error) => console.error('Error adding recipient:', error));
  };

  return (
    <>
      <Navbar />
      
      <div className="flex "></div>
      <Sidebar/>
      <div className="flex justify-center items-center h-screen ">
        
        <div className="bg-pastel-green rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Add Recipient</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="recipient_name" className="block font-medium mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                id="recipient_name"
                name="recipient_name"
                value={newRecipient.recipient_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                placeholder="Enter recipient's name"
              />
            </div>
            <div>
              <label htmlFor="blood_group" className="block font-medium mb-2">
                Blood Group
              </label>
              <input
                type="text"
                id="blood_group"
                name="blood_group"
                value={newRecipient.blood_group}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                placeholder="Enter blood group"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newRecipient.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label htmlFor="age" className="block font-medium mb-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={newRecipient.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-medium mb-2">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={newRecipient.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                rows="4"
                placeholder="Enter address"
              ></textarea>
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={newRecipient.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
                placeholder="Enter phone number"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red hover:bg-green text-white font-bold py-3 px-6 rounded-md"
              >
                Add Recipient
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipient;
