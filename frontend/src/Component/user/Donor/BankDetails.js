import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../UserNavbar';
import Sidebar from './Donorsidebar'; // Assuming Sidebar component exists in a parent directory

const BloodBankDetailsPage = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodBankDetails = async () => {
      try {
        // Make a GET request to retrieve blood bank details
        const response = await axios.get('http://localhost:5000/bloodbanks');
        const data = response.data;

        // Update state with the retrieved blood bank data
        setBloodBanks(data);
      } catch (error) {
        setError('Error retrieving blood bank details.');
        console.error('Error:', error);
      }
    };

    fetchBloodBankDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-pro-white min-h-screen flex">
        
        <div className="items-center justify-center px-40 py-20">
          <div className="container mx-auto px-4 py-8 justify-center bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-8 text-center">Blood Bank Details</h1>
            
            {bloodBanks.length > 0 ? (
              bloodBanks.map((bloodBank) => (
                <div key={bloodBank.id} className="bg-pastel-green rounded-lg shadow-md p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">{bloodBank.name}</h2>
                  <p className="mb-2"><strong>Category:</strong> {bloodBank.category}</p>
                  <p className="mb-2"><strong>Phone:</strong> {bloodBank.phone}</p>
                  <p className="mb-2"><strong>District:</strong> {bloodBank.district}</p>
                  <p className="mb-2"><strong>Address:</strong> {bloodBank.address}</p>
                  <p className="mb-2"><strong>Email:</strong> {bloodBank.email}</p>
                  <p className="mb-2"><strong>Latitude:</strong> {bloodBank.latitude}</p>
                  <p className="mb-2"><strong>Longitude:</strong> {bloodBank.longitude}</p>
                </div>
              ))
            ) : (
              <p className="text-center">{error ? error : 'Loading...'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodBankDetailsPage;
